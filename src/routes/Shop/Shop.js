/**
 * @description 商店路由处理
 * @author xiankun
 */

 const router = require('koa-router')()
 router.prefix('/api/shop')
 const { loginCheck } = require('../../middlewares/loginCheck')
 const {
  controllerShopList
 } = require('../../controller/Shop/Shop')

 // 获取商家路由
router.post('/shopList', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await controllerShopList(data)
})

module.exports = router
