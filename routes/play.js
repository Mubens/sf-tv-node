const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getEpisodes, getAnimeList, getFilterList, getSearchList, getSearchSuggest } = require('../controller/play')

router.prefix('/api/play')

router.get('/list', async function (ctx, next) {
  const { pId } = ctx.request.query
  const data = await getEpisodes(pId)
  ctx.body = data ? new SuccessModel(data) : new ErrorModel('没有记录')
})

router.get('/index', async (ctx, next) => {
  const {
    type = -1,
    area = -1,
    is_finish = -1,
    season_month = -1,
    year = -1,
    style_id = -1,
    order = 0,
    sort = 0,
    page = 1,
    limit = 20
  } = ctx.request.query

  const data = await getAnimeList(type, area, is_finish, season_month, year, style_id, order, sort, page, limit)

  ctx.body = data ? new SuccessModel(data) : new ErrorModel('没有记录')
})

router.get('/filter_list', async (ctx, next) => {
  const data = await getFilterList()
  ctx.body = data ? new SuccessModel(data, '过滤器列表') : new ErrorModel('找不到数据')
})

router.get('/search', async (ctx) => {
  const { keyword, page = 1 } = ctx.request.query
  const data = await getSearchList(keyword, page)
  ctx.body = data ? new SuccessModel(data) : new ErrorModel('找不到数据')
})

router.get('/input_suggest', async (ctx) => {
  const { keyword } = ctx.request.query
  const data = await getSearchSuggest(keyword)
  ctx.body = data ? new SuccessModel(data) : new ErrorModel('找不到数据')
})

module.exports = router
