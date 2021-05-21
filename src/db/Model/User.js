const seq = require('../seq')

// 引入数据模型
const { STRING, BOOLEAN, INTEGER,FLOAT } = require('../seqTypes')
// 创建User模型
const User = seq.define('users', {
  // id 自动生成，设为主键
  username: { 
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '帐号,唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  phone:{
    type:INTEGER,
    comment:'手机号'
  },
  avatar: {
    type: STRING,
    comment: '头像，图片地址'
  },
  nickName: {
    type: STRING,
    defaultValue:'新用户',
    comment: '昵称'
  },
  gender: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1男性，2女性，3保密）'
  },
  money:{
    type:FLOAT,
    defaultValue:0.00,
    comment:'余额'
  },
  registerTime:{
    type:STRING,
    defaultValue:(new Date()).getTime(),
    comment:'注册时间'
  }
})

// 导出
module.exports = {
  User
}
