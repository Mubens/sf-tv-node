const { execSql, escape } = require('../db/mysql')
const { encrypt } = require('../utils/cryp')

const signup = async (name, password) => {
  name = escape(name)
  const userExitSQL = `SELECT id FROM users WHERE name=${name};`
  const userExit = await execSql(userExitSQL)

  // 如果 name 的记录存在，不能重复注册
  if (userExit.length) return false

  password = escape(encrypt(password))
  const insertSql = `INSERT INTO users (name, password) VALUES (${name}, ${password});`
  const res = await execSql(insertSql)
  return res.affectedRows > 0 ? true : false
}

const login = async (phone = undefined, email = undefined, password) => {
  const key = phone != null ? 'phone' : 'email'
  const value = escape(phone != null ? phone : email)
  password = escape(encrypt(password))

  const sql = `SELECT id, name, face FROM users WHERE ${key}=${value} AND password=${password}`

  console.log('sql is: ', sql)
  const data = await execSql(sql)

  return data.length > 0 ? data[0] : null
}

const register = async (name, password, phone = undefined, email = undefined) => {
  name = escape(name)
  password = escape(encrypt(password))
  let key, val
  if (phone != null) {
    key = 'phone'
    val = escape(phone)
  } else {
    key = 'email'
    val = escape(email)
  }

  const sql = `INSERT INTO users (name, face, password, ${key}) VALUES (${name}, 'http://localhost:3000/img/head/default.webp', ${password}, ${val});`
  const res = await execSql(sql)
  // console.dir(res)
  return res.affectedRows
}

const findUserByPhone = async (phone) => {
  const sql = `SELECT id FROM users WHERE phone = '${phone}';`
  const res = await execSql(sql)
  return res.length
}

const findUserByEmail = async (email) => {
  const sql = `SELECT id FROM users WHERE email = '${email}';`
  const res = await execSql(sql)
  return res.length
}

const getHistoryPlay = async (user_id, page, limit) => {
  const sql = `SELECT p.id, p.title, h.ep, v.title AS ep_title, v.img, h.play_time AS time, h.video_time FROM plays AS p JOIN historys AS h ON h.play_id = p.id JOIN videos AS v ON p.id = h.play_id WHERE h.ep = v.ep AND h.user_id = ${user_id} ORDER BY h.play_time DESC LIMIT ${
    (page - 1) * limit
  }, ${page * limit};`

  const data = await execSql(sql)
  return data.length ? data : null
}

const setHistoryPlay = async (user_id, play_id, ep, play_time, video_time) => {
  const exitSql = `SELECT user_id FROM historys WHERE user_id = ${user_id} AND play_id = ${play_id};`
  const exit = (await execSql(exitSql)).length

  let sql = ''
  if (exit) {
    sql = `UPDATE historys SET ep = ${ep}, play_time = ${play_time}, video_time = ${video_time} WHERE user_id = ${user_id} AND play_id = ${play_id};`
  } else {
    sql = `INSERT INTO historys (user_id, play_id, ep, play_time, video_time) VALUES(${user_id}, ${play_id}, ${ep}, ${play_time}, ${video_time});`
  }

  return (await execSql(sql)).affectedRows > 0
}

module.exports = {
  signup,
  login,
  register,
  findUserByPhone,
  findUserByEmail,
  getHistoryPlay,
  setHistoryPlay
}
