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
  const key = phone ? 'phone' : 'email'
  const value = escape(phone ? phone : email)
  password = escape(encrypt(password))

  const sql = `SELECT id, name, face FROM users WHERE ${key}=${value} AND password=${password}`

  console.log('sql is: ', sql)
  const data = await execSql(sql)

  return data.length > 0 ? data[0] : null
}

module.exports = {
  signup,
  login
}
