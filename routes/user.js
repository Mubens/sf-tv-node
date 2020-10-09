const router = require('koa-router')()

const { createToken, verifyToken } = require('../model/jwt')
const { signUp, login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/signup', async (ctx, next) => {
  const { name, password } = ctx.request.body
  const res = await signUp(name, password)
  ctx.body = res ? new SuccessModel('注册成功') : new ErrorModel('注册失败')
})

router.post('/login', async (ctx, next) => {
  const { phone, email, password } = ctx.request.body
  const data = await login(phone, email, password)

  if (data) {
    const token = createToken({ id: data.id, name: data.name }, '7d')

    // console.log('token:', verifyToken(token))

    ctx.body = new SuccessModel({ token, id: data.id }, '登录成功')
  } else {
    ctx.body = new ErrorModel('登录失败')
  }
})

module.exports = router
