const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')

const danmaku = require('./routes/danmaku')
const comment = require('./routes/comment')
const play = require('./routes/play')
const user = require('./routes/user')

const { REDIS_CONF } = require('./conf/db')

// error handler
onerror(app)

app.use(historyApiFallback({ whiteList: ['/api'] }))

// test cors
app.use(require('koa2-cors')())

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session 配置
app.keys = ['FengGe_QQ#1321219448']
app.use(
  session({
    // cookie 配置
    cookie: { path: '/', httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
    // redis 配置
    store: redisStore({ host: REDIS_CONF.host, port: REDIS_CONF.port })
  })
)

// routes
app.use(danmaku.routes(), danmaku.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(play.routes(), play.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
