/**
 * @description 数据库数据处理
 * @author xiankun
 */
const { getTime } = require('../utils/time')
const setCrypto = require("../utils/crypto")
const { serviceShopList } = require("./Shop/Shop")
const { User, Bill, Discount, Address, Order, ShopMenuFood, Shop, Comment } = require('../db/Model')
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
        code: '1009'
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
    let findData = {
      where: { userId: id },
      order: [
        ['id', 'DESC']
      ],
    }
    if (reqData.id) {
      findData.where = {
        userId: id,
        id: reqData.id
      }
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

// 获取商品信息
const getFoodInfo = async (obj) => {
  let totalPrice = 0
  let data = []
  for (let key in obj) {
    const foodInfo = await ShopMenuFood.findOne({
      where: {
        id: key
      }
    })
    const foodObj = {
      img: foodInfo.foodImg,
      num: obj[key],
      name: foodInfo.foodName,
      id: foodInfo.id
    }
    totalPrice += foodInfo.foodPrice * obj[key]
    data.push(foodObj)
  }
  return {
    data,
    totalPrice: totalPrice.toFixed(2),
  }
}

// 获取用户订单
const serviceUserOrder = async ({ id }, reqData) => {
  try {
    const findData = {
      attributes: ['food', 'id', 'shopId', 'arrive', 'commentId', 'discount'],
      where: { userId: id },
      order: [
        ['id', 'DESC']
      ],
    }
    const { rows } = await Order.findAndCountAll(findData)
    let orders = []
    for (let i = 0; i < rows.length; i++) {
      const obj = rows[i]
      const food = await getFoodInfo(JSON.parse(obj.food))
      const { data: shop } = await serviceShopList({ id: obj.shopId })
      console.log(obj);
      const newObj = {
        food: {
          ...food,
          totalPrice: food.totalPrice * 1
            + shop[0].deliver * 1
            + food.data.length * 0.5
            - (obj.discount * 1 || 0)
        },
        order: obj,
        shop: {
          name: shop[0].shopname,
          img: shop[0].logo,
          id: shop[0].id,
          deliver: shop[0].deliver,
        },
      }
      orders.push(newObj)
    }
    // rows.forEach(async (obj, index) => {
    //   const food = await getFoodInfo(JSON.parse(obj.food))
    //   const newObj = {
    //     food,
    //     obj
    //   }
    //   orders.push(newObj)
    // })
    return {
      code: '1000',
      data: orders,
    }
  } catch (err) {
    console.log(err);
    return {
      code: '1102',
    }
  }
}

// 用户下单
const serviceUserOrderCreate = async ({ username, id }, reqData) => {
  try {
    reqData.userId = id
    reqData.time = (new Date()).getTime()
    const { money } = await serviceGetUserInfo(username) // 查询原有金额
    const { totalPrice, data } = await getFoodInfo(JSON.parse(reqData.food))
    const { data: shop } = await serviceShopList({ id: reqData.shopId })
    const redMoney = totalPrice * 1
      + shop[0].deliver * 1
      + 0.5 * data.length
      - reqData.discount * 1
    const newMoney = money * 1 - redMoney
    if (redMoney > money) {
      return {
        code: '1008'
      }
    }
    // 更新用户信息
    await serviceEditUserInfo({ username }, {
      redMoney,
      title: shop[0].shopname,
      money: newMoney,
    })
    // 更新红包信息
    await Discount.destroy({
      where: {
        id: reqData.discountId
      }
    });
    const newOrder = await Order.create(reqData)
    if (newOrder) {
      return {
        code: '1000',
        data: {
          money: newMoney,
        }
      }
    }
  } catch (err) {
    console.log(err);
    return {
      code: '1107'
    }
  }
}

// 获取用户评价
const serviceUserComment = async (reqData) => {
  try {
    if (!reqData.id) {
      return {
        code: '1102',
      }
    }
    const findData = {
      where: { shopId: reqData.id },
      order: [
        ['id', 'DESC']
      ],
      include: {
        attributes: ['avatar', 'nickName'],
        model: User
      }
    }
    if (reqData.num) {
      findData.limit = reqData.num
    }
    if (reqData.page) {
      findData.offset = reqData.num * (reqData.page - 1)
    }

    const { rows: comments } = await Comment.findAndCountAll(findData)
    return {
      code: '1000',
      data: comments
    }
  } catch (err) {
    console.log(err);
    return {
      code: '1102',
    }
  }
}

// 用户评价
const serviceUserCommentCreate = async ({ username, id }, reqData) => {
  try {
    reqData.userId = id
    reqData.time = (new Date()).getTime()
    const newOrder = await Comment.create(reqData)
    if (newOrder) {
      await Order.update({ commentId: reqData.userId },{
        where: { id:reqData.orderId }
      })
      return {
        code: '1000'
      }
    }
  } catch (err) {
    console.log(err);
    return {
      code: '1108'
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
  serviceUserOrder,
  serviceUserOrderCreate,
  serviceUserCommentCreate,
  serviceUserComment,
}
