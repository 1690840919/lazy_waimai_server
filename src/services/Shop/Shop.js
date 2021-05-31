/**
 * @description 数据库数据处理
 * @author xiankun
 */

const { Shop } = require('../../db/Model/Shop')

// 获取商家
const serviceShopList = async (reqData) => {
  // 查询条件
  try {
    const findData = {}
    if (reqData.id) {
      findData.where = { id: reqData.id }
    }
    if (reqData.num) {
      findData.limit = reqData.num
    }
    if (reqData.page) {
      findData.offset = reqData.num * (reqData.page - 1)
    }

    const { rows: bills } = await Shop.findAndCountAll(findData)
    return {
      code: '1000',
      data: bills
    }
  } catch (err) {
    return {
      code: '1102',
    }
  }
}

module.exports = {
  serviceShopList
}
