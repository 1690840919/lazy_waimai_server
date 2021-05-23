const Koa = require('koa')
const app = new Koa()
const cors = require("koa2-cors")
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./config/db')
const { SESSION_SECRET_KEY } = require('./config/secretKeys')

const index = require('./routes/index')
const User = require('./routes/User/User')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// session
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'lazy_waimai.sid', // cookie name 默认是koa.sid
  prefix: 'lazy_waimai:sess', // redis key 的前缀 默认是koa:sess
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 10 * 60 * 1000  // ms 1小时 5分钟
  },
  // ttl: 60 * 60 * 1000 // ms 1小时 redis 过期时间，不写会自动设置和cookie一样
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// 跨域解决
// app.use(
//   cors({
//       origin: function(ctx) { //设置允许来自指定域名请求
//           return 'http://localhost:3000'; //只允许http://localhost:3000这个域名的请求
//       },
//       maxAge: 5, //指定本次预检请求的有效期，单位为秒。
//       credentials: true, //是否允许发送Cookie
//       allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
//       allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
//       exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
//   })
// );

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(User.routes(), User.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
