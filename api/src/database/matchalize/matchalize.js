const DataTypes = require('./data-types')
const Model = require('./model')

class Matchalize {
  constructor(config) {
    this.config = {
      database: config.database,
      user: config.user,
      password: config.password,
      host: config.host,
      port: config.port
    }
  }

  define(modelName, attributes, options) {
    if (!options.tableName) throw new Error('The option tableName is require')
    const model = new Model(this, modelName, attributes, options)

    return model
  }

  getModel(path) {
    const modelFunction = require(path)
    
    return modelFunction(this, DataTypes)
  }
}

module.exports = Matchalize