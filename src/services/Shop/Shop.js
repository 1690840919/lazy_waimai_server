/**
 * @description 数据库数据处理
 * @author xiankun
 */

const { Shop, ShopMenu, ShopMenuFood, User } = require('../../db/Model')
const { Op } = require("sequelize");

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
    if (reqData.menu === '热销' || reqData.menu === '折扣') {
      return await serviceShopSomeFood(reqData)
    }
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

// 获取折扣商品或热销商品
const serviceShopSomeFood = async (reqData) => {
  try {
    const findData = {}
    if (reqData.menu === '热销') {
      findData.where = {
        shopId: reqData.id,
        foodSale: {
          [Op.gte]: 150, // 大于等于100
        }
      }
    } else if (reqData.menu === '折扣') {
      findData.where = {
        shopId: reqData.id,
        foodPrice: {
          [Op.lte]: 9.9, // 小于20
        }
      }
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

// 获取收藏商店
const serviceShopCollect = async ({ id }, reqData) => {
  try {
    let res
    const { collectShopId } = await User.findOne({
      attributes: ['collectShopId'],
      where: { id }
    })
    if (collectShopId) {
      const arr = collectShopId.split(',')
      res = await Shop.findAll({
        where: {
          id: {
            [Op.in]: arr
          }
        }
      })
    } else {
      res = []
    }
    return {
      code: '1000',
      data: res
    }
  } catch (err) {
    return {
      code: '1102',
    }
  }

}

const serviceShopSearch = async (reqData) => {
  try {
    const findData = {
      where: {
        [Op.or]: [
          {
            shopname: {
              [Op.like]: `%${reqData.searchValue}%`
            }
          },
          {
            item: {
              [Op.like]: `%${reqData.searchValue}%`
            }
          }
        ]
      }
    }
    const { rows: shops } = await Shop.findAndCountAll(findData)
    return {
      code: '1000',
      data: shops
    }
  } catch (err) {
    console.log(err);
    return {
      code: '1102',
    }
  }
}


module.exports = {
  serviceShopList,
  serviceShopMenu,
  serviceShopFood,
  serviceShopCollect,
  serviceShopSearch,
}
