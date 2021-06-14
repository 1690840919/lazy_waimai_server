/**
 * @description 商店路由处理
 * @author xiankun
 */

const router = require('koa-router')()
router.prefix('/api/shop')
const { loginCheck } = require('../../middlewares/loginCheck')
const {
  controllerShopList,
  controllerShopMenu,
  controllerShopFood,
  controllerShopCollect,
  controllerShopSearch,
} = require('../../controller/Shop/Shop')

// 获取商家路由
router.post('/shopList', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerShopList(data)
})
// 获取商家菜单路由
router.post('/shopMenu', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerShopMenu(data)
})
// 获取商家菜单商品路由
router.post('/shopFood', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerShopFood(data)
})
// 获取收藏商家路由
router.post('/shopCollect', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerShopCollect(ctx.session.userInfo, data)
})
// 商家搜索
router.post('/shopSearch', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerShopSearch(data)
})



module.exports = router
