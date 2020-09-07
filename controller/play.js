const { execSql } = require('../db/mysql')

const getEpisodes = async (pId) => {
  const sql = `SELECT id, ep, title, video FROM videos WHERE pId = ${pId};`
  const data = await execSql(sql)
  return data ? data : null
}

module.exports = {
  getEpisodes
}
