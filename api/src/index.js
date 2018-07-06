const express = require('express')
const bodyParser = require('body-parser')

const postgresClient = require('./config/database')
const logger = require('./services/logger')
const config = require('../config')
// const decodetoken = require('./middlewares/token').decodetoken
const corsBrowser = require('./middlewares/cors').corsBrowser
const corsRouter = require('./middlewares/cors').corsRouter
const errorsHandling = require('./middlewares/errors-handling').errorsHandling
const requestInfos = require('./middlewares/request-infos').requestInfos

const app = express()

postgresClient.connect()
.then(() => {
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(corsBrowser)
  app.use(corsRouter)
  // app.use(decodetoken)
  app.use(requestInfos)

  app.use(errorsHandling)

  app.listen(config.PORT, function () {
    logger.info('App listening on port ' + config.PORT)
  })
})
