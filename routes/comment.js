const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getMainComment, getSubComment } = require('../controller/comment')

router.prefix('/api/comment')

router.get('/main', function (ctx, next) {
  const { vId, page = 1, limit = 20 } = ctx.request.query
  ctx.body = new SuccessModel(getMainComment(vId, page - 1, limit), 'main comment')
})

router.get('/sub', function (ctx, next) {
  const { cId, page = 1, limit = 10 } = ctx.request.query
  ctx.body = new SuccessModel(getSubComment(cId, page, limit))
})

module.exports = router
