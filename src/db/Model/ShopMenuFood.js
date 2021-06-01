const seq = require('../seq')

// 引入数据模型
const { STRING, BOOLEAN, INTEGER, FLOAT,ARRAY } = require('../seqTypes')
// 创建User模型
const ShopMenuFood = seq.define('shopMenuFood', {
  // id 自动生成，设为主键
  foodName: {
    type: STRING,
    allowNull: false,
    comment: '菜单名'
  },
  shopId:{
    type: STRING,
    allowNull: false,
    comment: '商家id'
  },
  foodMenu:{
    type: STRING,
    allowNull: false,
    comment: '商品类别'
  },
  foodTip: {
    type: STRING,
    allowNull: false,
    comment: '商品提示语句'
  },
  foodImg:{
    type: STRING,
    allowNull: false,
    comment: '商品图片'
  },
  foodPrice:{
    type: FLOAT,
    allowNull: false,
    comment: '商品价格'
  },
  foodSale:{
    type: INTEGER,
    allowNull: false,
    comment: '商品月售'
  },
  foodStar:{
    type: INTEGER,
    allowNull: false,
    comment: '商品好评'
  },
  foodLike:{
    type: INTEGER,
    allowNull: false,
    comment: '商品点赞'
  },
  foodLabel:{
    type: STRING,
    allowNull: false,
    comment: '商品标签'
  },
})

// 导出
module.exports = {
  ShopMenuFood
}
