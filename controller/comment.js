const xss = require('xss')
const { execSql, escape } = require('../db/mysql')

/* 获取一级评论 */
const getMainComment = async (pId, ep, page = 1, limit = 20) => {
  // 查询 一级评论条数
  const mainTotalSql = `SELECT id FROM comments WHERE pId = ${pId} AND ep = ${ep} AND mId IS NULL;`
  const total = await execSql(mainTotalSql)
  // 如果一级评论没有记录
  if (!total.length) return { page, limit, total: 0, all_total: 0, comments: [] }

  // 查询所有评论 id
  const allTotalSql = `SELECT id FROM comments WHERE pId = ${pId} AND ep = ${ep};`
  const allTotal = await execSql(allTotalSql)

  // json 数据
  const data = { page, limit, total: total.length, all_total: allTotal.length, comments: [] }

  // 查询一级评论
  const mainSql = `SELECT comments.id, comments.content, comments.like, comments.time, 
                   users.id as uId, users.face as uFace, users.name as uName FROM comments 
                   JOIN users ON users.id = comments.uId 
                   WHERE pId = ${pId} AND ep = ${ep} AND mId IS NULL 
                   ORDER BY time 
                   LIMIT ${(page - 1) * limit}, ${limit};`
  const originMainData = await execSql(mainSql)

  data.comments = originMainData

  // 获取二级评论
  for (let i = 0; i < originMainData.length; i++) {
    data.comments[i].children = await getSubComment(originMainData[i].id, 1, 3, '`like`')
  }
  return data
}

/* 获取二级评论 */
const getSubComment = async (mId, page = 1, limit = 10, order = 'time') => {
  // 查询二级评论的条数
  const subTotalSql = `SELECT id FROM comments WHERE mId = ${mId};`
  const subTotal = await execSql(subTotalSql)

  const data = {
    page,
    limit,
    total: subTotal.length,
    comments: []
  }

  if (subTotal.length) {
    // 查询二级评论
    const subSql = `SELECT comments.id, comments.content, comments.like, comments.time, users.id as uId, users.face as uFace, users.name as uName, replyUsers.id as ruId, replyUsers.face as ruFace, replyUsers.name as ruName FROM comments JOIN users ON users.id = comments.uId JOIN users as replyUsers ON replyUsers.id = comments.ruId WHERE mId = ${mId} ORDER BY ${order} LIMIT ${
      (page - 1) * limit
    }, ${limit};`
    const originSubData = await execSql(subSql)
    data.comments = originSubData
  }

  return data
}

/* 插入一级评论 */
const insertComment = async (pId, ep, content, time = Date.now(), uId, ruId = undefined, mId = undefined) => {
  content = JSON.stringify(xss(content))
  let sql = `INSERT INTO comments (pId, ep, content, time, uId) VALUES (${pId}, ${ep}, ${content}, ${time}, ${uId});`

  // 二级评论
  if (ruId || mId) {
    sql = `INSERT INTO comments (pId, ep, content, time, uId, ruId, mId) VALUES (${pId}, ${ep}, ${content}, ${time}, ${uId}, ${ruId}, ${mId});`
  }
  const res = await execSql(sql)

  if (res.affectedRows) {
    // 插入成功
    let sql = `SELECT comments.id, comments.content, comments.like, comments.time, 
               users.id as uId, users.face as uFace, users.name as uName 
               FROM comments JOIN users ON users.id = comments.uId 
               WHERE comments.id = ${res.insertId};`
    // 二级评论
    if (ruId || mId) {
      sql = `SELECT comments.id, comments.content, comments.like, comments.time, 
             users.id as uId, users.face as uFace, users.name as uName, 
             replyUsers.id as ruId, replyUsers.face as ruFace, replyUsers.name as ruName 
             FROM comments JOIN users ON users.id = comments.uId JOIN users as replyUsers ON replyUsers.id = comments.ruId 
             WHERE comments.id = ${res.insertId};`
    }

    return await execSql(sql)
  } else {
    // 插入失败
    return null
  }
}

module.exports = {
  getMainComment,
  getSubComment,
  insertComment
}
