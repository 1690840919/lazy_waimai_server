/**
 * @description 数据模型入口
 * @author beitu
 */

const { User } = require('./User')
const { Bill } = require('./Bill')
const { Discount } = require('./Discount')
const { Address } = require('./Address')
const { Shop } = require('./Shop')
const { ShopMenu } = require('./ShopMenu')
const { ShopMenuFood } = require('./ShopMenuFood')
const { Order } = require('./Order')
const { Comment } = require("./Comment")

module.exports = {
  User,
  Bill,
  Discount,
  Address,
  Shop,
  ShopMenu,
  ShopMenuFood,
  Order,
  Comment,
}
