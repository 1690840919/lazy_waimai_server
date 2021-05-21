/**
 * @description 加密方法
 * @author xiankun
 */

const  crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/secretKeys')

// md5加密
function _md5(content){
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密方法
function setCrypto(content){
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = setCrypto
