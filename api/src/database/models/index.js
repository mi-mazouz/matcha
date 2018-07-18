const _ = require('lodash')
const path = require('path')

const Matchalize = require('../matchalize/matchalize')
const databaseConfig = require('../../config').DATABASE

const matchalize = new Matchalize(databaseConfig)
const modelFiles = [
  'user'
]
const models = _.keyBy(modelFiles.map(file => matchalize.getModel(path.join(__dirname, file))), 'name')

module.exports = models
