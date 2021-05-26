/**
 * @description 工具路由处理
 * @author xiankun
 */
const router = require('koa-router')()
const {
  controllerUploadImg
} = require('../../controller/utils/Upload')
const { loginCheck } = require('../../middlewares/loginCheck')
router.prefix('/api/utils')

// 上传图片路由
router.post('/uploadImg', loginCheck, async (ctx, next) => {
  const data = ctx.request.files.file
  ctx.body = await controllerUploadImg(data, ctx.origin)
})

module.exports = router
