const express = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt');
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const config = require('../config')
const logger = require('./services/logger')
const errorsHandling = require('./middlewares/errors-handling').errorsHandling
const requestInfos = require('./middlewares/request-infos').requestInfos
const authenticationRouter = require('./authentication/routes')

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }), bodyParser.urlencoded({ extended: true }))
app.use(expressJwt({ secret: fs.readFileSync(path.join(__dirname, './config/secret.key')), credentialsRequired: false }))
app.use(requestInfos)

app.post('/authentication', authenticationRouter);

app.use(errorsHandling)

app.listen(config.PORT, function () {
  logger.info('App listening on port ' + config.PORT)
})
