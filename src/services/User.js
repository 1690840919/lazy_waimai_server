/**
 * @description 数据库数据处理
 * @author xiankun
 */
const { getTime } = require('../utils/time')
const setCrypto = require("../utils/crypto")
const { User, Bill, Discount, Address } = require('../db/Model')
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
    attributes: ['id', 'username', 'nickName', 'avatar', 'money',
      'showMoney', 'isVip', 'vipTime', 'vipPacketNum',
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
const serviceEditUserInfo = async ({ username }, newData) => {
  try {
    const { money, id } = await serviceGetUserInfo(username) // 查询原有金额
    const result = await User.update(newData, {
      where: { username }
    });
    if (result) {
      if (newData.money) { // 涉及到金额，产生账单
        const add = newData.money * 1 > money * 1 //判断变动情况 是增加还是减少
        const billData = {
          userId: id, // 用户id
          isSpend: !add, // 是不是消费
          title: add ? '充值金额' : newData.title, // 账单标题
          num: add ? newData.addMoney : newData.redMoney, // 变动的金额
          money: newData.money, // 余额
        }
        await createUserBill(billData)// 接收1、变动金额。2、消费标题。
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
  }

}

// 获取红包/卡券
const serviceUserDiscount = async ({ id: userId }, reqData) => {
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

    const { rows: discount } = await Discount.findAndCountAll(findData)
    return {
      code: '1000',
      data: discount
    }
  } catch (err) {
    return {
      code: '1102',
    }
  }
}
// 生成红包/卡券
const createUserDiscount = async ({
  isPacket, money, title, time, method,
  userId, img, condition
}) => {
  try {
    const data = {
      userId,
      img,
      time,
      money,
      title,
      method,
      condition,
      isPacket,
    }
    const newDiscount = await Discount.create(data)
  } catch (err) {
    console.log(err);
  }

}

// 充值VIP
const serviceUserVip = async ({ username }, { money, month }) => {
  try {
    const oldUserInfo = await serviceGetUserInfo(username)
    if (oldUserInfo.money < money) {
      return {
        code: '1008'
      }
    }
    if (!oldUserInfo.vipPacketNum) {

    }
    // 开会员4个红包
    const newVipPacketNum = oldUserInfo.vipPacketNum || 4
    const newMoney = oldUserInfo.money - money
    let dateArr = getTime(oldUserInfo.vipTime, 'YY-MM-DD').split('-')
    if ((dateArr[1] * 1 + month) <= 12) {
      dateArr[1] = dateArr[1] * 1 + month
    } else {
      const num = dateArr[1] * 1 + month - 12
      dateArr[0] = dateArr[0] * 1 + 1
      dateArr[1] = num < 10 ? "0" + num : num
    }
    const newVipTime = (new Date(dateArr.join('-'))).getTime() + ""
    // 更新信息
    const { code } = await serviceEditUserInfo({ username }, {
      vipTime: newVipTime,
      redMoney: money,
      title: '充值VIP',
      money: newMoney,
      isVip: true,
      vipPacketNum: newVipPacketNum,
    })
    if (code !== '1000') {
      return { code: "1103" }
    }
    return {
      code: '1000',
      data: {
        newVipTime,
        newMoney,
      }
    }
  } catch {
    return { code: "1103" }
  }
}

// 领取会员红包
const serviceUserVipPacket = async ({ username }) => {
  try {
    const userInfo = await serviceGetUserInfo(username)
    if (!userInfo.isVip) {
      return {
        code: '1008'
      }
    }
    const vipPacketNum = userInfo.vipPacketNum - 1
    if (vipPacketNum < 0) {
      return {
        code: '1009'
      }
    }
    // 更新信息
    const { code } = await serviceEditUserInfo({ username }, {
      vipPacketNum
    })
    if (code !== '1000') {
      return { code: "1104" }
    }
    // 新建红包
    createUserDiscount({
      userId: userInfo.id,
      img: "",
      time: (new Date()).getTime() + 7 * 24 * 60 * 60 * 1000,
      money: 5,
      title: '会员红包',
      method: '限制外卖订单使用',
      condition: 0,
      isPacket: true,
    })
    return {
      code: '1000'
    }
  } catch (err) {
    console.log(err);
    return {
      code: '1104'
    }
  }
}

// 保存地址
const serviceUserNewAddress = async ({ username, id }, reqData) => {
  try {
    reqData.userId = id
    if (reqData.id) {
      return await serviceUserEditAddress({ username, id }, reqData)
    }
    const newAddress = await Address.create(reqData)
    if (newAddress) {
      return { code: '1000' }
    }
  } catch (err) {
    return {
      code: '1105'
    }
  }
}

// 修改地址
const serviceUserEditAddress = async ({ username, id }, reqData) => {
  try {
    if (reqData.isDefault) {
      const defaultResult = await Address.update({ isDefault: false }, {
        where: {
          userId: id,
          isDefault: true
        }
      });
      if (!defaultResult) {
        return {
          code: '1006'
        }
      }
    }
    const result = await Address.update(reqData, {
      where: { id: reqData.id }
    });
    if (result) {
      return {
        code: '1000'
      }
    }
    return {
      code: '1006'
    }
  } catch (err) {
    return {
      code: '1006'
    }
  }

}

// 获取地址
const serviceUserAddress = async ({ username, id }, reqData) => {
  try {
    const findData = {
      where: { userId: id },
      order: [
        ['id', 'DESC']
      ],
    }
    const { rows: address } = await Address.findAndCountAll(findData)
    return {
      code: '1000',
      data: address
    }
  } catch (err) {
    return {
      code: '1102',
    }
  }
}

// 删除地址
const serviceUserDeleteAddress = async ({ username }, { id }) => {
  try {
    const result = await Address.destroy({
      where: {
        id
      }
    })
    console.log('result', result);
    return {
      code: '1000'
    }
  } catch (err) {
    return {
      code: "1106"
    }
  }
}

module.exports = {
  serviceRegisterUserName,
  serviceLoginUserName,
  serviceEditUserInfo,
  serviceUserBill,
  serviceUserDiscount,
  serviceUserVip,
  serviceUserVipPacket,
  serviceUserNewAddress,
  serviceUserAddress,
  serviceUserDeleteAddress,
}
