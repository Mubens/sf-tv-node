const router = require('koa-router')()

const Jwt = require('../model/jwt')
const {
  signup,
  login,
  register,
  findUserByPhone,
  findUserByEmail,
  getHistoryPlay,
  setHistoryPlay
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getUserId } = require('../middleware/checkLogin')

router.prefix('/api/user')

router.post('/signup', async (ctx, next) => {
  const { name, password } = ctx.request.body
  const res = await signup(name, password)
  ctx.body = res ? new SuccessModel('注册成功') : new ErrorModel('注册失败')
})

router.post('/login', async (ctx, next) => {
  const { phone, email, password } = ctx.request.body
  const data = await login(phone, email, password)

  if (data) {
    const token = new Jwt({ id: data.id, name: data.name }, '7d').token

    ctx.body = new SuccessModel({ token, id: data.id }, '登录成功')
  } else {
    ctx.body = new ErrorModel('登录失败')
  }
})

router.post('/register', async (ctx) => {
  const { name, password, phone = undefined, email = undefined } = ctx.request.body
  if (name && password && (phone || email)) {
    const res = await register(name, password, phone, email)
    ctx.body = res ? new SuccessModel('注册成功') : new ErrorModel('注册失败')
  } else {
    ctx.body = new ErrorModel('信息填写不完整')
  }
})

router.post('/find_phone', async (ctx) => {
  const { phone } = ctx.request.body
  const res = await findUserByPhone(phone)
  ctx.body = res ? new ErrorModel('该手机号已被注册') : new SuccessModel('可使用该手机号')
})

router.post('/find_email', async (ctx) => {
  const { email } = ctx.request.body
  const res = await findUserByEmail(email)
  ctx.body = res ? new ErrorModel('该邮箱已被注册') : new SuccessModel('可使用该邮箱')
})

router.get('/history', getUserId, async (ctx) => {
  const { page = 1, limit = 20 } = ctx.request.query
  const { user_id } = ctx.request.body
  if (user_id) {
    const data = await getHistoryPlay(user_id, page, limit)
    ctx.body = data ? new SuccessModel(data, '历史记录') : new ErrorModel('无记录')
  } else {
    ctx.body = new ErrorModel('未登录')
  }
})

router.post('/update_history', getUserId, async (ctx) => {
  const { user_id, play_id, ep, play_time, video_time } = ctx.request.body
  if (user_id) {
    const data = await setHistoryPlay(user_id, play_id, ep, play_time, video_time)
    ctx.body = data ? new SuccessModel('添加成功') : new ErrorModel('添加失败')
  } else {
    ctx.body = new ErrorModel('未登录')
  }
})

module.exports = router
