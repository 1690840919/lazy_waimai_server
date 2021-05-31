const seq = require('../seq')

// 引入数据模型
const { STRING, BOOLEAN, INTEGER, FLOAT,ARRAY } = require('../seqTypes')
// 创建User模型
const Shop = seq.define('shop', {
  // id 自动生成，设为主键
  shopname: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '店铺名'
  },
  name: {
    type: STRING,
    allowNull: false,
    comment: '联系人'
  },
  phone: {
    type: STRING,
    comment: '联系电话'
  },
  logo: {
    type: STRING,
    comment: '店铺logo'
  },
  deliver: {
    type: INTEGER,
    defaultValue: 0,
    comment: '配送费'
  },
  condition: {
    type: INTEGER,
    defaultValue: 0,
    comment: '起送费用'
  },
  notice: {
    type: STRING,
    comment: '店铺公告'
  },
  address: {
    type: STRING,
    comment: '店铺地址'
  },
  star: {
    type: INTEGER,
    comment: '店铺评分'
  },
  collectUser:{
    type:STRING,
    comment: '收藏的用户'
  },
  price: {
    type: INTEGER,
    comment: '￥19/人'
  },
  item: {
    type: STRING,
    comment: '主要卖什么的'
  },
  newShop: {
    type: BOOLEAN,
    defaultValue:false,
    comment: '是不是新店'
  },
  juan: {
    type: STRING,
    comment: '代金券'
  },
  jian: {
    type: STRING,
    comment: '满减优惠'
  },
  tuan: {
    type: STRING,
    comment: '团购优惠'
  },
})

// 导出
module.exports = {
  Shop
}
