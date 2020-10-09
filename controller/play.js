const { execSql } = require('../db/mysql')

const getEpisodes = async (pId) => {
  const pSql = `SELECT img, title, pCount, dCount, cCount, type, status, description, score, sCount FROM plays WHERE id = ${pId};`

  const playData = await execSql(pSql)
  if (playData.length) {
    const sql = `SELECT id, ep, title, video FROM videos WHERE pId = ${pId} ORDER BY ep;`
    const epsData = await execSql(sql)
    return {
      play: playData[0],
      eps: epsData
    }
  }
  return null
}

module.exports = {
  getEpisodes
}
