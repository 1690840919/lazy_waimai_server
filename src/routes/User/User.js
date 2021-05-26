/**
 * @description 路由处理
 * @author xiankun
 */
const router = require('koa-router')()
const {
  controllerRegisterUsername,
  controllerLoginUsername,
  controllerExitUsername,
  controllerEditUserInfo,
  controllerLoginCheck,
} = require('../../controller/User')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginCheck')
const userValidate = require('../../validator/user')
router.prefix('/api/user')

// 注册帐号路由
router.post('/registerUserName', genValidator(userValidate), async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerRegisterUsername(data)
})

// 登陆账号路由
router.post('/loginUserName', genValidator(userValidate), async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerLoginUsername({ ctx, ...data })
})

// 退出账号路由
router.post('/exitUserName', loginCheck, async (ctx, next) => {
  ctx.body = await controllerExitUsername(ctx)
})

// 资料修改路由
router.post('/editUserInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerEditUserInfo(ctx.session.userInfo, data)
})

// 检验登陆是否过期
router.post('/loginCheck', loginCheck, async (ctx, next) => {
  ctx.body = await controllerLoginCheck(ctx)
})

module.exports = router
