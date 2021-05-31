/** 
 * @description 商铺业务逻辑
 * @author xiankun
 */

 const { SuccessModel, ErrorModel } = require("../../Model/ResModel")
 const allCode = require('../../config/ResCode')
 const {
  serviceShopList
 } = require('../../services/Shop/Shop')

 // 获取商家业务逻辑
const controllerShopList = async (reqData) => {
  const { code, data } = await serviceShopList(reqData)
  if (code === '1000') {
    return new SuccessModel({ message: '获取成功', data })
  }
  return new ErrorModel({ code, message: allCode[code] })
}

module.exports = {
  controllerShopList
}
