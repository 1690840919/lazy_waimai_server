/**
 * @description 封装sequelize的数据类型
 * @author beitu
 */
 const Sequelize = require('sequelize')

 module.exports = {
   STRING: Sequelize.STRING, // 字符串
   DECIMAL: Sequelize.DECIMAL, // 小数
   TEXT: Sequelize.TEXT, // 文本
   INTEGER: Sequelize.INTEGER, // 整型
   BOOLEAN: Sequelize.BOOLEAN, // 布尔类型
   FLOAT:Sequelize.FLOAT, // 浮点数
   ARRAY:Sequelize.ARRAY, // 数组
 }
 