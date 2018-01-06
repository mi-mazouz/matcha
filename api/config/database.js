const mongoose = require('mongoose')
const logger = require('../src/services/logger')

const connect = (uri) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri).connection
    .on('error', (err) => {
      logger.error('[MongoDB] Connection error: ', err)
      reject(err)
    })
    .once('open', () => {
      logger.info('[MongoDB][SUCCESS] Connection successful')
      resolve()
    })
  })
}

module.exports = {
  connect
}
