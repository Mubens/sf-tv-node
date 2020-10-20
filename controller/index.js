const { execSql } = require('../db/mysql')

const getRecentUpdate = async () => {
  const sql = 'SELECT id, title, new_ep, small_img FROM plays ORDER BY update_time DESC LIMIT 0, 50;'
  const data = await execSql(sql)
  return data.length ? data : null
}

const getSerialAnimation = async () => {
  const sql =
    'SELECT plays.id AS play_id, videos.title, videos.ep, videos.img, videos.play_num, videos.danmaku_num FROM videos JOIN plays ON videos.pId = plays.id WHERE plays.status = 0 ORDER BY videos.add_time DESC LIMIT 0, 10;'
  const data = await execSql(sql)
  return data.length ? data : null
}

const getEndAnimation = async () => {
  const sql =
    'SELECT plays.id AS play_id, videos.title, videos.ep, videos.img, videos.play_num, videos.danmaku_num FROM videos JOIN plays ON videos.pId = plays.id WHERE plays.status = 1 ORDER BY videos.add_time DESC LIMIT 0, 10;'

  const data = await execSql(sql)

  return data.length ? data : null
}

module.exports = {
  getRecentUpdate,
  getSerialAnimation,
  getEndAnimation
}
