const seq = require('../seq')

// 引入数据模型
const { STRING, BOOLEAN, INTEGER } = require('../seqTypes')
// 创建User模型
const Address = seq.define('address', {
  // id 自动生成，设为主键
  userId: {
    type: STRING,
    allowNull: false,
    comment: '用户id'
  },
  name: {
    type: STRING,
    allowNull: false,
    comment: '姓名'
  },
  phone: {
    type: STRING,
    allowNull: false,
    comment: '手机号码'
  },
  address: {
    type: STRING,
    allowNull: false,
    comment: '地区',
  },
  detail: {
    type: STRING,
    allowNull: false,
    comment: '详细地址'
  },
  isDefault: {
    type: BOOLEAN,
    defaultValue: false,
    comment: '是否默认地址'
  }
})

// 导出
module.exports = {
  Address
}
