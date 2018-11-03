const express = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const cors = require('cors')

const config = require('./config')
const logger = require('./config/logger')
const httpErrorsHandling = require('./middlewares/errors-handling')
const getLanguage = require('./middlewares/get-language')
const authenticationRouter = require('./authentication/routes')
const userRouter = require('./user/routes')
const { requestInfos } = require('./middlewares/request-infos')
const { getToken } = require('./middlewares/token-handling')
const { getSecretKey } = require('./tools')

const app = express()
const secretKey = getSecretKey()

app.use(
  cors({
    allowedHeaders: ['Content-Type, Authorization, Language'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
  }),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  expressJwt({
    secret: secretKey,
    credentialsRequired: false,
    getToken
  })
  .unless({
    path: ['/authentication/resend-confirm-email', '/authentication/resend-reset-password-email']
  }),
  requestInfos,
  getLanguage
)

app.use('/authentication', authenticationRouter)
app.use('/user', userRouter)

app.use(httpErrorsHandling)

app.listen(config.PORT, () => logger.info('App listening on port ' + config.PORT))
