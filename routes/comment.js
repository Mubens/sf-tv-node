const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getMainComment, getSubComment, insertComment, deleteComment } = require('../controller/comment')
const { checkLogin, getUserId } = require('../middleware/checkLogin')

router.prefix('/api/comment')

router.get('/main', getUserId, async function (ctx, next) {
  // console.log('header:', ctx.header)
  const { pId, ep, page = 1, limit = 20 } = ctx.request.query
  const user_id = ctx.request.body.user_id
  const data = await getMainComment(pId, ep, page, limit)
  ctx.body = data ? new SuccessModel({ ...data, user_id }, 'main comment') : new ErrorModel('没有记录')
})

router.get('/sub', async function (ctx, next) {
  const { cId, page = 1, limit = 10 } = ctx.request.query
  const data = await getSubComment(cId, page, limit)
  ctx.body = data ? new SuccessModel(data, 'sub comment') : new ErrorModel('没有记录')
})

router.post('/new', checkLogin, async (ctx, next) => {
  // 剧id, 集, 评论内容, 评论/回复人id, 被回复人id, 一级评论id
  const { playId, ep, content, userId, beUserId, mainId } = ctx.request.body
  const data = await insertComment(playId, ep, content, Date.now(), userId, beUserId, mainId)
  ctx.body = data ? new SuccessModel(data, '插入成功') : new ErrorModel('插入失败')
})

router.post('/del', checkLogin, async (ctx, next) => {
  const { comment_id } = ctx.request.body
  const res = await deleteComment(comment_id)
  ctx.body = res.affectedRows > 0 ? new SuccessModel('删除成功') : new ErrorModel('删除失败')
})

module.exports = router
