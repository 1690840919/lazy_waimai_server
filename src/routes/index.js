const router = require('koa-router')()
const {loginCheck} = require('../middlewares/loginCheck')

router.get('/',loginCheck, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 8!'
  })
})

module.exports = router
