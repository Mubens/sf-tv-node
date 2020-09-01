const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getDanmaku } = require('../controller/danmaku')

router.prefix('/api/danmaku')

router.get('/', function (ctx, next) {
  const { vId, ep } = ctx.request.query
  ctx.body = new SuccessModel(getDanmaku(vId, ep), 'success! danmaku')
})

module.exports = router
