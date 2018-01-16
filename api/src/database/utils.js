const Client = require('pg').Client

const logger = require('../services/logger')

const connect = (config) => {
  const client = new Client({
    connectionString: `postgres://${config.user}@${config.host}:${config.port}/${config.database}`
  })

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

const end = (client) => client.end()

const createEnum = (client, name, data) => {
  return client.query(`SELECT 1 FROM pg_type WHERE typname='${name}';`)
  .then((result) => {
    if (result.rowCount === 0) {
      return client.query(`CREATE TYPE ${name} AS ENUM (${data});`)
    }
  })
}

const selectWhere = (client, regex, tableName, conditions) => {
  return client.query(`SELECT ${regex} FROM ${tableName} WHERE ${conditions};`)
  .then((result) => JSON.parse(JSON.stringify(result)))
}

const updateWhere = (client, tableName, newData, conditions) => {
  return client.query(`UPDATE ${tableName} SET ${newData} WHERE ${conditions};`)
}

const insert = (client, tableName, columNames, values) => {
  return client.query(`INSERT INTO ${tableName} (${columNames}) VALUES (${values});`)
}

module.exports = {
  connect,
  createEnum,
  end,
  insert,
  selectWhere,
  updateWhere
}
