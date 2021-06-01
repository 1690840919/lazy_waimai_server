/**
 * @description 数据库数据处理
 * @author xiankun
 */

const { Shop, ShopMenu, ShopMenuFood } = require('../../db/Model')

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

// 获取商家菜单
const serviceShopMenu = async (reqData) => {
  try {
    const findData = {}
    if (reqData.id) {
      findData.where = { shopId: reqData.id }
      findData.attributes = ['menus', 'id']
    }
    const menus = await ShopMenu.findAll(findData)
    return {
      code: '1000',
      data: menus
    }
  } catch (err) {
    return {
      code: '1102',
    }
  }
}

// 获取商家商品
const serviceShopFood = async (reqData) => {
  try {
    const findData = {}
    if (reqData.menu) {
      findData.where = { shopId: reqData.id, foodMenu: reqData.menu }
    }
    const foods = await ShopMenuFood.findAll(findData)
    return {
      code: '1000',
      data: foods
    }
  } catch (err) {
    return {
      code: '1102',
    }
  }
}

module.exports = {
  serviceShopList,
  serviceShopMenu,
  serviceShopFood,
}
