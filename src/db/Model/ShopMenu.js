const seq = require('../seq')

// 引入数据模型
const { STRING, BOOLEAN, INTEGER, FLOAT,ARRAY } = require('../seqTypes')
// 创建User模型
const ShopMenu = seq.define('shopMenu', {
  // id 自动生成，设为主键
  menus: {
    type: STRING,
    allowNull: false,
    comment: '菜单名'
  },
  shopId: {
    type: STRING,
    allowNull: false,
    comment: '商家id'
  }
})

// 导出
module.exports = {
  ShopMenu
}
