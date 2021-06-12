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
  controllerUserBill,
  controllerUserDiscount,
  controllerUserVip,
  controllerUserVipPacket,
  controllerUserNewAddress,
  controllerUserAddress,
  controllerUserDeleteAddress,
  controllerUserOrder,
  controllerUserOrderCreate,
  controllerUserCommentCreate,
  controllerUserComment,
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

// 获取账单路由
router.post('/userBill', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserBill(ctx.session.userInfo, data)
})

// 获取账单路由
router.post('/userDiscount', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserDiscount(ctx.session.userInfo, data)
})

// 充值VIP路由
router.post('/userVip', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserVip(ctx.session.userInfo, data)
})

// 领取会员红包路由
router.post('/userVipPacket', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserVipPacket(ctx.session.userInfo, data)
})

// 新增地址路由
router.post('/userNewAddress', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserNewAddress(ctx.session.userInfo, data)
})

// 获取地址路由
router.post('/userAddress', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserAddress(ctx.session.userInfo, data)
})

// 获取地址路由
router.post('/userDeleteAddress', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserDeleteAddress(ctx.session.userInfo, data)
})

// 获取用户订单路由
router.post('/userOrder', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserOrder(ctx.session.userInfo, data)
})

// 用户下单路由
router.post('/userOrderCreate', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserOrderCreate(ctx.session.userInfo, data)
})

// 用户评价路由
router.post('/userCommentCreate', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserCommentCreate(ctx.session.userInfo, data)
})

// 获取用户评价路由
router.post('/userComment', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerUserComment(data)
})

module.exports = router
