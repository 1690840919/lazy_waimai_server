/**
 * @description 业务逻辑和格式处理
 * @author xiankun
 */

const { SuccessModel, ErrorModel } = require("../../Model/ResModel")
const path = require("path")
const allCode = require('../../config/ResCode')

// 上传图片业务逻辑
const controllerUploadImg = async ({ path }, origin) => {
  try {
    const arr = path.split("\\")
    const basename = arr[arr.length - 1]
    const data = {
      url: `http://10.235.83.94:7000/${basename}`,
      // url: `${origin}/${basename}`
    }
    return new SuccessModel({ message: '上传成功', data })
  } catch (err) {
    return new ErrorModel({ code: '1007', message: allCode['1007'] })
  }

}


module.exports = {
  controllerUploadImg
}
