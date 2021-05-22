const {isDev} = require('./env')
let MYSQL_CONF // mysql配置

// mysql
MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'lazy_waimai'
}
// redis
REDIS_CONF = {
  port:6379,
  host:'127.0.0.1',
}

// 生产环境
if(isDev){
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'lazy_waimai'
  }
  REDIS_CONF = {
    port:6379,
    host:'127.0.0.1',
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
