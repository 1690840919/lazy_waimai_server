/**
 * @description 业务逻辑和格式处理
 * @author xiankun
 */

const {
  serviceRegisterUserName,
  serviceLoginUserName
} = require('../services/User')
const { SuccessModel , ErrorModel } = require("../Model/ResModel")
const allCode = require('../config/ResCode')

// 注册用户业务逻辑
const controllerRegisterUsername = async data => {
  const {password,surePassword} = data
  if(password !== surePassword){
    return new ErrorModel({code:1001,message:allCode['1001']})
  }
  const { code } = await serviceRegisterUserName(data)
  if(code === '1000'){
    return new SuccessModel({message:'注册成功'})
  }
  return new ErrorModel({code,message:allCode[code]})
}

// 登陆用户业务逻辑
const controllerLoginUsername = async loginData => {
  const { code,data } = await serviceLoginUserName(loginData)
  if(code === '1000'){
    return new SuccessModel({message:'登陆成功',data})
  }
  return new ErrorModel({code,message:allCode[code]})
}

module.exports = {
  controllerRegisterUsername,
  controllerLoginUsername
}
