const seq = require('../seq')

// 引入数据模型
const { STRING, BOOLEAN, INTEGER } = require('../seqTypes')
// 创建User模型
const Discount = seq.define('discount', {
  // id 自动生成，设为主键
  userId: {
    type: STRING,
    allowNull: false,
    comment: '用户id'
  },
  img: {
    type: STRING,
    allowNull: false,
    comment: '图片'
  },
  title: {
    type: STRING,
    allowNull: false,
    comment: '折扣标题'
  },
  money: {
    type: INTEGER,
    allowNull: false,
    comment: '金额'
  },
  isPacket: {
    type: BOOLEAN,
    allowNull: false,
    comment: '是不是红包'
  },
  time: {
    type: STRING,
    allowNull: false,
    comment: '过期时间',
  },
  condition:{
    type: INTEGER,
    allowNull: false,
    comment: '条件金额'
  },
  method:{
    type: STRING,
    allowNull: false,
    comment: '使用方式，外卖，到店可用',
  }
})

// 导出
module.exports = {
  Discount
}
