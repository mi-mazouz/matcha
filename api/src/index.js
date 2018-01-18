const express = require('express')
const bodyParser = require('body-parser')

const logger = require('./services/logger')
const config = require('../config')
const postgreSqlInitialization = require('./database/initialization.js')
const authenticationRouter = require('./routes/authentication')
// const locationRouter = require('./routes/location')
const pictureRoute = require('./routes/picture')
const userRoute = require('./routes/user')
const decodetoken = require('./middlewares/token').decodetoken
const corsBrowser = require('./middlewares/cors').corsBrowser
const corsRouter = require('./middlewares/cors').corsRouter
const errorsHandling = require('./middlewares/errors-handling').errorsHandling
const requestInfos = require('./middlewares/request-infos').requestInfos

const app = express()

postgreSqlInitialization(config.DATABASE)
.then(() => {
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(corsBrowser)
  app.use(corsRouter)
  app.use(decodetoken)

  app.use(requestInfos)
  app.use('/authentication', authenticationRouter)
  app.use('/picture', pictureRoute)
  app.use('/user', userRoute)
  // app.use('/location', locationRouter)
  app.use(errorsHandling)

  app.listen(config.PORT, function () {
    logger.info('Api listening on port ' + config.PORT)
  })
})
