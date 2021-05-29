/**
 * @description 数据模型入口
 * @author beitu
 */

const { User } = require('./User')
const { Bill } = require('./Bill')
const { Discount } = require('./Discount')
const { Address } = require('./Address')

module.exports = {
  User,
  Bill,
  Discount,
  Address,
}
