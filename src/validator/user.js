/**
 * @description user数据格式校验文件
 * @author xiankun
 */

const validate = require("./_validator")
const registerSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      // pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 16,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 16,
      minLength: 6
    },
    surePassword: {
      type: 'string',
      maxLength: 16,
      minLength: 6
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  }
}

/**
* 校验用户数据格式
* @param {Object} data 用户数据
*/
function userValidate(data = {}) {
  return validate(registerSchema, data)
}

module.exports = userValidate
