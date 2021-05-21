/**
 * @description 数据库数据处理
 * @author xiankun
 */
const setCrypto = require("../utils/crypto")
const { User } = require('../db/Model/User') // 获取user模型
const escape = require("../utils/escape") // 转义

// 注册用户
const serviceRegisterUserName = async (data) => {
  const username = escape(data.username)
  const password = escape(data.password)
  const userInfo = await serviceGetUserInfo(username)
  if (userInfo) {
    return { code: '1002' }
  }
  try {
    const newUserInfo = await User.create({
      username,
      password: setCrypto(password),
    })
    if (newUserInfo) {
      return { code: '1000' }
    }
    return { code: '1001' }
  } catch {
    return { code: '1001' }
  }

}

// 获取用户信息
const serviceGetUserInfo = (username, password) => {

  // 查询条件
  const whereOpt = { username }
  if (password) {
    Object.assign(whereOpt, { password })
  }

  const userInfo = User.findOne({
    attributes: ['id', 'username', 'nickName', 'avatar'],
    where: whereOpt
  })
  return userInfo
}

// 登陆用户
const serviceLoginUserName = async (data) => {
  const username = escape(data.username)
  const password = setCrypto(escape(data.password))
  try{
    const userInfo = await serviceGetUserInfo(username,password)
    console.log(userInfo);
    if(!userInfo){
      return {
        code:'1003',
      }
    }
    return {
      code:'1000',
      data:userInfo
    }
  }catch{
    return {
      code:'1004',
    }
  }
  
}

module.exports = {
  serviceRegisterUserName,
  serviceLoginUserName
}
