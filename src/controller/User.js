/**
 * @description 业务逻辑和格式处理
 * @author xiankun
 */

const {
  serviceRegisterUserName,
  serviceLoginUserName,
  serviceEditUserInfo,
  serviceUserBill,
  serviceUserDiscount,
  serviceUserVip,
  serviceUserVipPacket,
  serviceUserNewAddress,
  serviceUserAddress,
  serviceUserDeleteAddress,
  serviceUserOrder,
  serviceUserOrderCreate,
  serviceUserCommentCreate,
  serviceUserComment,
} = require('../services/User')
const { SuccessModel, ErrorModel } = require("../Model/ResModel")
const allCode = require('../config/ResCode')

// 注册用户业务逻辑
const controllerRegisterUsername = async data => {
  const { password, surePassword } = data
  if (password !== surePassword) {
    return new ErrorModel({ code: 1001, message: allCode['1001'] })
  }
  const { code } = await serviceRegisterUserName(data)
  if (code === '1000') {
    return new SuccessModel({ message: '注册成功' })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 登陆用户业务逻辑
const controllerLoginUsername = async loginData => {
  const { code, data } = await serviceLoginUserName(loginData)
  if (code === '1000') {
    return new SuccessModel({ message: '登陆成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 退出登陆业务逻辑
const controllerExitUsername = async (ctx) => {
  try {
    delete ctx.session.userInfo
    return new SuccessModel({ message: '退出成功' })
  } catch (err) {
    return new ErrorModel({ code: '1101', message: allCode['1101'] })
  }
}

// 资料修改业务逻辑
const controllerEditUserInfo = async (oldData, newData) => {
  const { code } = await serviceEditUserInfo(oldData, newData)
  if (code === '1000') {
    return new SuccessModel({ message: '修改成功' })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 检测登陆业务逻辑
const controllerLoginCheck = async (ctx) => {
  return new SuccessModel({ message: '用户已登录' })
}

// 获取账单业务逻辑
const controllerUserBill = async (userInfo, reqData) => {
  const { code, data } = await serviceUserBill(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 获取红包卡券业务逻辑
const controllerUserDiscount = async (userInfo, reqData) => {
  const { code, data } = await serviceUserDiscount(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 充值VIP业务逻辑
const controllerUserVip = async (userInfo, reqData) => {
  const { code, data } = await serviceUserVip(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '充值成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 领取红包业务逻辑
const controllerUserVipPacket = async (userInfo, reqData) => {
  const { code, data } = await serviceUserVipPacket(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '领取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 新增地址业务逻辑
const controllerUserNewAddress = async (userInfo, reqData) => {
  const { code, data } = await serviceUserNewAddress(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '保存成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 获取地址业务逻辑
const controllerUserAddress = async (userInfo, reqData) => {
  const { code, data } = await serviceUserAddress(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 删除地址业务逻辑
const controllerUserDeleteAddress = async (userInfo, reqData) => {
  const { code, data } = await serviceUserDeleteAddress(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '删除成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 获取用户订单业务逻辑
const controllerUserOrder = async (userInfo, reqData) => {
  const { code, data } = await serviceUserOrder(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 用户下单业务逻辑
const controllerUserOrderCreate = async (userInfo, reqData) => {
  const { code, data } = await serviceUserOrderCreate(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '下单成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 用户评价业务逻辑
const controllerUserCommentCreate = async (userInfo, reqData) => {
  const { code, data } = await serviceUserCommentCreate(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '评价成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 获取用户评价业务逻辑
const controllerUserComment = async (reqData) => {
  const { code, data } = await serviceUserComment(reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}


module.exports = {
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
}
