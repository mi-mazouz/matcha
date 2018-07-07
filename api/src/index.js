const express = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt');
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const config = require('../config')
const postgresClient = require('./config/database')
const logger = require('./services/logger')
const errorsHandling = require('./middlewares/errors-handling').errorsHandling
const requestInfos = require('./middlewares/request-infos').requestInfos

const app = express()

postgresClient.connect()
.then(() => {
  app.use(
    cors(),
    bodyParser.json({ limit: '50mb' }),
    bodyParser.urlencoded({ extended: true }),
    expressJwt({ secret: fs.readFileSync(path.join(__dirname, './config/secret.key')), credentialsRequired: false }),
    requestInfos
  )

  app.use(errorsHandling)

  app.listen(config.PORT, function () {
    logger.info('App listening on port ' + config.PORT)
  })
})
