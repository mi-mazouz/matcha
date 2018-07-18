const logger = require('../../services/logger')

class ConnectionManager {
  constructor () {
    this.client = require('pg').Client
  }

  connect(config) {
    const client = new this.client(config)

    return client.connect()
    .then(() => {
      logger.info(`[PostgreSQL][SUCCESS] Connection successful on port: ${config.port}`)
      return Promise.resolve(client)
    })
    .catch((error) => {
      logger.error('[PostgreSQL][ERROR] Connection error: ', error)
      return Promise.reject(error)
    })
  }

  disconnect(client) {
    return client.end()
  }
}

module.exports = ConnectionManager