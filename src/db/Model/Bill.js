const seq = require('../seq')

// 引入数据模型
const { STRING, BOOLEAN, INTEGER } = require('../seqTypes')
// 创建User模型
const Bill = seq.define('bill', {
  // id 自动生成，设为主键
  userId: {
    type: STRING,
    allowNull: false,
    comment: '用户id'
  },
  isSpend: {
    type: BOOLEAN,
    allowNull: false,
    comment: '是否消费'
  },
  title: {
    type: STRING,
    allowNull: false,
    comment: '账单标题'
  },
  num: {
    type: INTEGER,
    allowNull: false,
    comment: '账单金额'
  },
  money: {
    type: INTEGER,
    allowNull: false,
    comment: '余额'
  },
  time: {
    type: STRING,
    allowNull: false,
    defaultValue: (new Date()).getTime() + "",
    comment: '账单标题',
  }
})

// 导出
module.exports = {
  Bill
}
