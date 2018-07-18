const _ = require('lodash')

const ConnectionManager = require('./connection-manager')

class QueryInterface {
  constructor(config) {
    this.connectionManager = new ConnectionManager()
    this.config = config
  }

  select(tableName, options) {
    return this.connectionManager.connect(this.config)
    .then((client) => {
      const parsedOptions = _.map(options.where, (value, key) => `${key}='${value}'`).join(' AND ')
      
      return client.query(`SELECT * FROM ${tableName} WHERE ${parsedOptions};`)
      .then((result) => {
        this.connectionManager.disconnect(client)
        
        return Promise.resolve(result)
      })
    })
  }
}

module.exports = QueryInterface