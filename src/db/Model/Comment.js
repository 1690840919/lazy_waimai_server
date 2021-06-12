const seq = require('../seq')
const { User } = require('./User')
// 引入数据模型
const { STRING, BOOLEAN, INTEGER, ENUM } = require('../seqTypes')
// 创建User模型
const Comment = seq.define('comment', {
  // id 自动生成，设为主键
  userId: {
    type: STRING,
    allowNull: false,
    comment: '用户id'
  },
  shopId: {
    type: STRING,
    allowNull: false,
    comment: '商家id',
  },
  time: {
    type: STRING,
    allowNull: false,
    comment: "评论时间"
  },
  commentText: {
    type: STRING,
    defaultValue: '用户没有留下评价',
    comment: "评价内容"
  },
  img: {
    type: STRING,
    comment: "评价图片"
  },
  type: {
    type: STRING,
    comment: "评价类型"
  },
  star: {
    type: STRING,
    comment: "评价打分"
  },
  isName: {
    type: BOOLEAN,
    defaultValue: false,
    comment: "是否匿名"
  }
})

Comment.belongsTo(User, {
  foreignKey: "userId",
  targetKey: 'id',
});

// 导出
module.exports = {
  Comment
}
