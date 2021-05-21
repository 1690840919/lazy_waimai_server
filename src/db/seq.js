const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')

const SEQ_CONF = {
  host: 'localhost',
  dialect: 'mysql',
  timezone:'+08:00', 
}

const seq = new Sequelize(
  MYSQL_CONF.database,
  MYSQL_CONF.user,
  MYSQL_CONF.password,
  SEQ_CONF
)

seq.sync()

module.exports = seq
