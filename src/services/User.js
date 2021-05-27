/**
 * @description 数据库数据处理
 * @author xiankun
 */
const setCrypto = require("../utils/crypto")
const { User } = require('../db/Model/User') // 获取user模型
const { Bill } = require('../db/Model/Bill')
const escape = require("../utils/escape") // 转义

// 注册用户
const serviceRegisterUserName = async (data) => {
  const username = escape(data.username)
  const password = escape(data.password)
  const userInfo = await serviceGetUserInfo(username)
  if (userInfo) {
    return { code: '1002' }
  }
  try {
    const newUserInfo = await User.create({
      username,
      password: setCrypto(password),
    })
    if (newUserInfo) {
      return { code: '1000' }
    }
    return { code: '1001' }
  } catch {
    return { code: '1001' }
  }

}

// 获取用户信息
const serviceGetUserInfo = (username, password) => {

  // 查询条件
  const whereOpt = { username }
  if (password) {
    Object.assign(whereOpt, { password })
  }

  const userInfo = User.findOne({
    attributes: ['id', 'username', 'nickName', 'avatar', 'money', 'showMoney',
      'gender', 'registerTime', 'phone'],
    where: whereOpt
  })
  return userInfo
}

// 登陆用户
const serviceLoginUserName = async (data) => {
  const username = escape(data.username)
  const password = setCrypto(escape(data.password))
  const session = data.ctx.session
  try {
    const userInfo = await serviceGetUserInfo(username, password)
    console.log(userInfo);
    // 登陆失败
    if (!userInfo) {
      return {
        code: '1003',
      }
    }
    // 登陆成功
    if (session.userInfo == null) {
      session.userInfo = userInfo
    }
    return {
      code: '1000',
      data: userInfo
    }
  } catch {
    return {
      code: '1004',
    }
  }

}

// 资料修改
const serviceEditUserInfo = async ({ username, money, id }, newData) => {
  // 更新条件
  const where = { username }
  try {
    const result = await User.update(newData, {
      where
    });
    if (result) {
      if (newData.money) {
        const add = newData.money * 1 > money * 1
        createUserBill({
          userId: id,
          isSpend: !add,
          title: '充值金额',
          num: add ? newData.addMoney : newData.redMoney,
          money: newData.money,
        })
      }
      return {
        code: '1000',
      }
    }
  } catch (err) {
    return {
      code: '1006',
    }
  }

}

// 获取账单
const serviceUserBill = async ({ id: userId }, reqData) => {
  // 查询条件
  try {
    const findData = {
      where: { userId },
      order: [
        ['id', 'DESC']
      ],
    }
    if (reqData.num) {
      findData.limit = reqData.num
    }
    if (reqData.page) {
      findData.offset = reqData.num * (reqData.page - 1)
    }

    const { rows: bills } = await Bill.findAndCountAll(findData)
    return {
      code: '1000',
      data: bills
    }
  } catch (err) {
    return {
      code: '1102',
    }
  }
}

// 生成账单
const createUserBill = async ({ money, title, userId, isSpend, num }) => {
  try {
    const data = {
      money,
      title,
      isSpend,
      userId,
      num,
      time: (new Date()).getTime()
    }
    const newBill = await Bill.create(data)
  } catch (err) {
    console.log(err);
  }

}

module.exports = {
  serviceRegisterUserName,
  serviceLoginUserName,
  serviceEditUserInfo,
  serviceUserBill,
}
