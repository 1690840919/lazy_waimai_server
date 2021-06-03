const seq = require('../seq')

// 引入数据模型
const { STRING, BOOLEAN, INTEGER } = require('../seqTypes')
// 创建User模型
const Order = seq.define('order', {
  // id 自动生成，设为主键
  userId: {
    type: STRING,
    allowNull: false,
    comment: '用户id'
  },
  addressId: {
    type: STRING,
    allowNull: false,
    comment: '订单地址id'
  },
  shopId:{
    type:STRING,
    comment:'商家id'
  },
  food:{
    type:STRING,
    comment:'商品id和数量'
  },
  arrive:{
    type:BOOLEAN,
    defaultValue:false,
    comment:"订单状态"
  },
  deliverTime:{
    type: STRING,
    comment: '配送时间'
  },
  payMethod:{
    type: STRING,
    comment: '支付方式'
  },
  tip: {
    type: STRING,
    comment: '备注信息'
  },
  isTicket:{
    type: BOOLEAN,
    comment: '是否发票',
  },
  money: {
    type: INTEGER,
    comment: '订单总价'
  },
  time: {
    type: STRING,
    allowNull: false,
    comment: '下单时间',
  },
  commentId:{
    type: STRING,
    comment: '评论id',
  },
  tools:{
    type: STRING,
    comment: '餐具份数',
  }
})

// 导出
module.exports = {
  Order
}
