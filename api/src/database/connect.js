const { Client } = require('pg')
const logger = require('../services/logger')

const config = require('../config')

module.exports = () => {
  const postgresClient = new Client({
    user: config.DATABASE['user'],
    host: config.DATABASE['host'],
    database: config.DATABASE['name'],
    password: config.DATABASE['password'],
    port: config.DATABASE['posrt'],
  })

  return postgresClient.connect()
  .then(() => {
    logger.info(`[PostgreSQL][SUCCESS] Connection successful on port: ${config.PORT}`)
    return Promise.resolve(postgresClient)
  })
  .catch((error) => {
    logger.error('[PostgreSQL][ERROR] Connection error: ', error)
    return Promise.reject(error)
  })
}

