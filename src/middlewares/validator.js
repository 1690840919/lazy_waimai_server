/**
 * @description 数据校验中间件
 * @author xiankun
 */
const {ErrorModel} = require('../Model/ResModel')
const allCode = require("../config/ResCode")

const genValidator = (validatorFn) => {
  async function validator(ctx,next) {
    // 校验函数
    const err = validatorFn(ctx.request.body)
    if(err){
      const message = (err.instancePath+" "+err.message).replace('/','')
      if(err.instancePath === '/phone'){
        ctx.body = new ErrorModel({code:'1201',message:allCode['1201']})
        return
      }
      ctx.body = new ErrorModel({code:'1100',message})
      // ctx.body = err
    }else{
      // 验证成功 ，继续下一步
      await next()
    }
  }
  return validator
}

module.exports = {
  genValidator
}
