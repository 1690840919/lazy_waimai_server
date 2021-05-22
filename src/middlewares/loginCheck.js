/**
 * @description 登陆认证中间件
 * @author xiankun 
 */

const { ErrorModel } = require("../Model/ResModel")
const  allCode = require("../config/ResCode")
/**
 * API登陆认证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx,next){
  if(ctx.session && ctx.session.userInfo){
    // 已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel({code:'1005',message:allCode['1005']})
}


module.exports = {
  loginCheck,
}
