/** 
 * @description 商铺业务逻辑
 * @author xiankun
 */

const { SuccessModel, ErrorModel } = require("../../Model/ResModel")
const allCode = require('../../config/ResCode')
const {
  serviceShopList,
  serviceShopMenu,
  serviceShopFood,
  serviceShopCollect,
  serviceShopSearch,
} = require('../../services/Shop/Shop')

// 获取商家业务逻辑
const controllerShopList = async (reqData) => {
  const { code, data } = await serviceShopList(reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 获取商家业务逻辑
const controllerShopMenu = async (reqData) => {
  const { code, data } = await serviceShopMenu(reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

// 获取商家业务逻辑
const controllerShopFood = async (reqData) => {
  const { code, data } = await serviceShopFood(reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}
// 获取收藏商家逻辑
const controllerShopCollect = async (userInfo, reqData) => {
  const { code, data } = await serviceShopCollect(userInfo, reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}
// 商家搜索逻辑
const controllerShopSearch = async ( reqData) => {
  const { code, data } = await serviceShopSearch( reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

module.exports = {
  controllerShopList,
  controllerShopMenu,
  controllerShopFood,
  controllerShopCollect,
  controllerShopSearch,
}
