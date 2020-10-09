const xss = require('xss')
const { execSql, escape } = require('../db/mysql')

/**
 * 获取一级评论
 * @param {Number} pId
 * @param {Number} ep
 * @param {Number} page
 * @param {Number} limit
 */
const getMainComment = async (pId, ep, page = 1, limit = 20) => {
  // 查询 一级评论条数
  const mainTotalSql = `SELECT id FROM comments WHERE state=0 AND pId=${pId} AND ep=${ep} AND mId IS NULL;`
  console.log('sql is: ', mainTotalSql)
  const total = await execSql(mainTotalSql)
  // 如果一级评论没有记录
  if (!total.length) return { page, limit, total: 0, all_total: 0, comments: [] }

  // 查询所有评论 id
  const allTotalSql = `SELECT id FROM comments WHERE state=0 AND pId=${pId} AND ep=${ep};`
  console.log('sql is: ', allTotalSql)
  const allTotal = await execSql(allTotalSql)

  // json 数据
  const data = { page, limit, total: total.length, all_total: allTotal.length, comments: [] }

  // 查询一级评论
  const mainSql = `SELECT c.id, c.content, c.like, c.time, u.id AS uId, u.face AS uFace, u.name AS uName FROM comments AS c JOIN users AS u ON u.id=c.uId WHERE c.state=0 AND pId=${pId} AND ep=${ep} AND mId IS NULL ORDER BY time LIMIT ${
    (page - 1) * limit
  }, ${limit};`
  console.log('sql is: ', mainSql)
  const mainData = await execSql(mainSql)

  data.comments = mainData

  // 获取二级评论
  for (let i = 0; i < mainData.length; i++) {
    data.comments[i].children = await getSubComment(mainData[i].id, 1, 3, '`like`')
  }
  return data
}

/**
 * 获取二级评论
 * @param {Number} mId 一级评论 id
 * @param {Number} page 页码
 * @param {Number} limit 每页条目数
 * @param {String} order 排序规则
 */
const getSubComment = async (mId, page = 1, limit = 10, order = 'time') => {
  // 查询二级评论的条数
  const subTotalSql = `SELECT id FROM comments WHERE state=0 AND mId=${mId};`
  console.log('sql is: ', subTotalSql)
  const subTotal = await execSql(subTotalSql)

  const data = { page, limit, total: subTotal.length, comments: [] }

  if (subTotal.length) {
    // 查询二级评论
    const subSql = `SELECT c.id, c.content, c.like, c.time, u.id AS uId, u.face AS uFace, u.name AS uName, ru.id AS ruId, ru.face AS ruFace, ru.name AS ruName FROM comments AS c JOIN users AS u ON u.id=c.uId JOIN users AS ru ON ru.id=c.ruId WHERE c.state=0 AND mId=${mId} ORDER BY ${order} LIMIT ${
      (page - 1) * limit
    }, ${limit};`
    console.log('sql is: ', subSql)
    const subData = await execSql(subSql)
    data.comments = subData
  }

  return data
}

/**
 * 插入一级评论
 * @param {Number} pId
 * @param {Number} ep
 * @param {String} content
 * @param {Number} time
 * @param {Number} uId
 * @param {Number} ruId
 * @param {Number} mId
 */
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
               users.id AS uId, users.face AS uFace, users.name AS uName 
               FROM comments JOIN users ON users.id=comments.uId 
               WHERE comments.id=${res.insertId};`
    // 二级评论
    if (ruId || mId) {
      sql = `SELECT comments.id, comments.content, comments.like, comments.time, 
             users.id AS uId, users.face AS uFace, users.name AS uName, 
             replyUsers.id AS ruId, replyUsers.face AS ruFace, replyUsers.name AS ruName 
             FROM comments JOIN users ON users.id=comments.uId JOIN users AS replyUsers ON replyUsers.id=comments.ruId 
             WHERE comments.id=${res.insertId};`
    }

    return await execSql(sql)
  } else {
    // 插入失败
    return null
  }
}

/* 删除评论 */
const deleteComment = async (comment_id) => {
  const sql = `UPDATE comments SET state=1 WHERE id=${comment_id};`
  return await execSql(sql)
}

module.exports = {
  getMainComment,
  getSubComment,
  insertComment,
  deleteComment
}
