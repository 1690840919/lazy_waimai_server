/**
 * @description 返回的数据模型
 * @author xiankun
 */

class BaseModel{
  constructor({code,data,message}){
    this.code = code
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}
class SuccessModel extends BaseModel{
  constructor({data,message}){
    super({
      code:1000,
      data,
      message
    })
  }
}
class ErrorModel extends BaseModel{
  constructor({code,message}){
    super({
      code,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}

