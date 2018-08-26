const Sequelize = require('sequelize')
const path = require('path')
const _ = require('lodash')

const logger = require('../../src/config/logger')
const config = require('../config').production

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: Sequelize.Op,
  timezone: 'UTC',
  logging: string => logger.debug(string)
})

const modelFiles = ['user']
const models = _.keyBy(modelFiles.map(file => sequelize.import(path.join(__dirname, file))), 'name')

module.exports = models
