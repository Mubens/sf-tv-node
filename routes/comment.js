const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getMainComment, getSubComment, insertComment } = require('../controller/comment')

router.prefix('/api/comment')

router.get('/main', async function (ctx, next) {
  const { pId, ep, page = 1, limit = 20 } = ctx.request.query
  const data = await getMainComment(pId, ep, page, limit)
  ctx.body = data ? new SuccessModel(data, 'main comment') : new ErrorModel('没有记录')
})

router.get('/sub', async function (ctx, next) {
  const { cId, page = 1, limit = 10 } = ctx.request.query
  const data = await getSubComment(cId, page, limit)
  ctx.body = data ? new SuccessModel(data, 'sub comment') : new ErrorModel('没有记录')
})

router.post('/new', async (ctx, next) => {
  // 剧id, 集, 评论内容, 评论/回复人id, 被回复人id, 一级评论id
  const { playId, ep, content, userId, beUserId = undefined, mainId = undefined } = ctx.request.body
  const data = await insertComment(playId, ep, content, Date.now(), userId, beUserId, mainId)
  ctx.body = data ? new SuccessModel(data, '插入成功') : new ErrorModel('插入失败')
})

module.exports = router
