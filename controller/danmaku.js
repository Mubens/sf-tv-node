const xss = require('xss')

const { execSql } = require('../db/mysql')

const getDanmaku = async (vId) => {
  const sql = `SELECT id, type, style, content, vtime, stime FROM danmakus WHERE vId = ${vId};`
  return await execSql(sql)
}

const insertDanmaku = async (type, style, content, vtime, userId, videoId) => {
  style = JSON.stringify(style)
  content = xss(content)
  const sql = `INSERT INTO danmakus (type, style, content, vtime, stime, uId, vId) VALUES ('${type}', '${style}', '${content}', ${vtime}, ${Date.now()}, ${userId}, ${videoId});`
  const res = await execSql(sql)

  if (res.affectedRows) {
    const sql = `SELECT id, type, style, content, vtime, stime FROM danmakus WHERE id = ${res.insertId};`
    return await execSql(sql)
  }
  return null
}

module.exports = {
  getDanmaku,
  insertDanmaku
}
