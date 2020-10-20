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

const TYPE = {
  1: '正片',
  2: '电影',
  3: '其他'
}

const AREA = {
  1: '日本',
  2: '美国',
  3: '其他'
}

const STYLE = {
  1: '原创',
  2: '漫画改',
  3: '小说改',
  4: '游戏改',
  5: '热血',
  6: '穿越',
  7: '奇幻',
  8: '战斗',
  9: '搞笑',
  10: '日常',
  11: '科幻',
  12: '萌系',
  13: '治愈',
  14: '校园',
  15: '恋爱',
  16: '少女',
  17: '魔法',
  18: '冒险',
  19: '历史',
  20: '机战',
  21: '神魔',
  22: '运动',
  22: '励志',
  22: '音乐',
  22: '推理',
  22: '美食',
  22: '偶像',
  22: '职场'
}

const getAnimeList = async (type, area, is_finish, season_month, year, style_id, order, sort, page, limit) => {
  let sql = `SELECT id, img, title, new_ep, all_eps, status, cCount AS sub_count FROM plays WHERE 1 = 1`

  let condition = ''

  if (type != -1) {
    condition += ` AND type = '${TYPE[type]}'`
  }

  if (area != -1) {
    condition += ` AND area = '${AREA[area]}'`
  }

  if (is_finish != -1) {
    condition += ` AND status = ${is_finish}`
  }

  if (season_month != -1) {
    condition += ` AND season_month = ${season_month}`
  }

  if (year != -1) {
    const { start = '', end = '' } = (year + '').match(/^\[(?<start>.*),(?<end>.*)\)$/).groups
    if (start) {
      condition += ` AND year >= ${start}`
    }

    if (end) {
      condition += ` AND year < ${end}`
    }
  }

  if (style_id != -1) {
    condition += ` AND styles LIKE '%${style_id},%'`
  }

  const total = (await execSql(`SELECT id FROM plays WHERE 1 = 1 ${condition};`)).length

  sql += condition + ` ORDER BY ${order == 0 ? 'cCount' : 'update_time'}`

  sql += ` ${sort == 0 ? 'DESC' : 'ASC'}`

  sql += ` LIMIT ${(page - 1) * limit}, ${limit};`

  console.log('sql is:', sql)

  return {
    page,
    total,
    limit,
    list: await execSql(sql)
  }
}

// 获取索引过滤器
const getFilterList = async () => {
  const sql = `SELECT id, filter AS 'key', title AS 'name' FROM filters WHERE ISNULL(filter_id);`

  const filters = await execSql(sql)

  for (let i = 0; i < filters.length; i++) {
    const sql = `SELECT id, title, filter AS value FROM filters WHERE filter_id = ${filters[i].id};`
    filters[i].options = await execSql(sql)
    filters[i].options.unshift({ title: '全部', value: -1 })
    filters[i].default = -1
  }

  const order = {
    key: 'order',
    title: '热播',
    default: 0,
    options: [
      { title: '追番人数', value: 0 },
      { title: '更新时间', value: 1 }
    ]
  }

  const sort = {
    key: 'sort',
    default: 0,
    down: 0,
    up: 1
  }

  const page = {
    key: 'page',
    default: 1
  }

  return [...filters, order, sort, page]
}

const getSearchList = async (keyword, page) => {
  const data = { limit: 20 }
  const lenSql = `SELECT id FROM plays WHERE title LIKE '%${keyword}%';`
  data.total = (await execSql(lenSql)).length

  const sql = `SELECT id, title, img, type, area, year, styles AS style, description FROM plays WHERE title LIKE '%${keyword}%' LIMIT ${
    (page - 1) * 20
  }, ${page * 20};`

  data.list = await execSql(sql)

  data.list.forEach((item) => {
    let str = ''
    const key = item.style.split(',')
    for (let i = 0; i < key.length; i++) {
      str += STYLE[key[i]] ? STYLE[key[i]] + ' ' : ''
    }
    item.style = str
  })

  return data
}

const getSearchSuggest = async (keyword) => {
  const sql = `SELECT id, title FROM plays WHERE title LIKE '%${keyword}%';`
  return await execSql(sql)
}

module.exports = {
  getEpisodes,
  getAnimeList,
  getFilterList,
  getSearchList,
  getSearchSuggest
}
