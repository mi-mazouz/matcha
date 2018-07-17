const express = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const config = require('../config')
const logger = require('./services/logger')
const errorsHandling = require('./middlewares/errors-handling').errorsHandling
const requestInfos = require('./middlewares/request-infos').requestInfos
const authenticationRouter = require('./authentication/routes')

const app = express()

const jwtSecret = Buffer.from(fs.readFileSync(path.join(__dirname, '/config/secret.key')), 'base64')

app.use(cors(), bodyParser.json(), expressJwt({ secret: jwtSecret, credentialsRequired: false }))
app.use(requestInfos)

app.use('/authentication', authenticationRouter)

app.use(errorsHandling)

app.listen(config.PORT, () => logger.info('App listening on port ' + config.PORT))