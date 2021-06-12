const seq = require('../seq')

// 引入数据模型
const { STRING, BOOLEAN, INTEGER, FLOAT } = require('../seqTypes')
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
  phone: {
    type: STRING,
    comment: '手机号'
  },
  avatar: {
    type: STRING,
    defaultValue: 'https://img0.baidu.com/it/u=3849281771,1234052768&fm=26&fmt=auto&gp=0.jpg',
    comment: '头像，图片地址'
  },
  nickName: {
    type: STRING,
    defaultValue: '新用户-蜡笔小鸡',
    comment: '昵称'
  },
  gender: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1男性，2女性，3保密）'
  },
  money: {
    type: FLOAT,
    defaultValue: 0.00,
    comment: '余额'
  },
  registerTime: {
    type: STRING,
    defaultValue: (new Date()).getTime() + "",
    comment: '注册时间'
  },
  showMoney: {
    type: BOOLEAN,
    defaultValue: true,
    comment: '是否显示余额',
  },
  isVip: {
    type: BOOLEAN,
    defaultValue: false,
    comment: '是否VIP',
  },
  vipTime: {
    type: STRING,
    defaultValue: (new Date()).getTime() + "",
    comment: '过期时间',
  },
  vipPacketNum: {
    type: INTEGER,
    defaultValue: 0,
    comment: '会员红包个数'
  },
  collectShopId: {
    type: STRING,
    comment: '收藏店铺的id'
  },
})

// 导出
module.exports = {
  User
}
