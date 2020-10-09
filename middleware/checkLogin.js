const { verifyToken } = require('../model/jwt')
const { ErrorModel } = require('../model/resModel')

const checkLogin = async (ctx, next) => {
  const { token } = ctx.request.body
  const {
    token: isToken,
    data: { iat, exp }
  } = verifyToken(token)
  // console.log(token, isToken, iat, exp)
  if (isToken && iat < exp) {
    // console.log('next')
    await next()
  } else {
    // console.log('err')
    ctx.body = new ErrorModel('身份验证过期，请重新登录')
  }
}

const getUserId = async (ctx, next) => {
  const { id = undefined } = verifyToken(ctx.header.authorization && ctx.header.authorization.split('Bearer ')[1]).data
  ctx.request.body.user_id = id
  await next()
}

module.exports = {
  checkLogin,
  getUserId
}
