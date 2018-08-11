const express = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const cors = require('cors')

const config = require('./config')
const logger = require('./services/logger')
const errorsHandling = require('./middlewares/errors-handling').errorsHandling
const requestInfos = require('./middlewares/request-infos').requestInfos
const getToken = require('./middlewares/token-handling').getToken
const authenticationRouter = require('./authentication/routes')

const secretKey = require('./utils').getSecretKey()
const app = express()

app.use(
  cors({
    allowedHeaders: ['Content-Type, Authorization'],
    methods: ['GET', 'PUT', 'POST', 'DELETE']
  }),
  bodyParser.json(),
  expressJwt({
    secret: secretKey,
    credentialsRequired: false,
    getToken
  })
)
app.use(requestInfos)

app.use('/authentication', authenticationRouter)

app.use(errorsHandling)

app.listen(config.PORT, () => logger.info('App listening on port ' + config.PORT))