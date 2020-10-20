const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getDanmaku, insertDanmaku } = require('../controller/danmaku')
const { getUserId } = require('../middleware/checkLogin')

router.prefix('/api/danmaku')

router.get('/list', async (ctx, next) => {
  const { vId } = ctx.request.query
  const data = await getDanmaku(vId)
  ctx.body = data ? new SuccessModel(data, 'danmaku list') : new ErrorModel('没有记录')
})

router.post('/new', getUserId, async (ctx, next) => {
  const { type, style, content, vtime, user_id, vId } = ctx.request.body
  // console.log({ type, style, content, vtime, user_id, vId })
  const data = await insertDanmaku(type, style, content, vtime, user_id, vId)
  ctx.body = data ? new SuccessModel(data, '插入成功') : new ErrorModel('插入失败')
})

module.exports = router
