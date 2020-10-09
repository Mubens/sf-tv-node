const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getEpisodes } = require('../controller/play')

router.prefix('/api/play')

router.get('/list', async function (ctx, next) {
  const { pId } = ctx.request.query
  const data = await getEpisodes(pId)
  ctx.body = data ? new SuccessModel(data) : new ErrorModel('没有记录')
})

module.exports = router
