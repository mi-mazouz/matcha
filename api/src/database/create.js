const connect = require('./connect')
const logger = require('../services/logger')

connect().then((postgresClient) => {
  return postgresClient.query(`CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR (16) NOT NULL,
    lastName VARCHAR (16) NOT NULL,
    username VARCHAR (16) NOT NULL,
    password VARCHAR (64) NOT NULL,
    mail VARCHAR (32) UNIQUE NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
  );`)
  .then(() => {
    logger.info(`[PostgreSQL][SUCCESS] Database created successfully`)
    return process.exit(0)
  })
  .catch((error) => {
    logger.error('[PostgreSQL][ERROR] Error during the database creation: ', error)
    return process.exit(1)
  })
})