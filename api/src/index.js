const express = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const cors = require('cors')
const glue = require('schemaglue')
const { ApolloServer } = require('apollo-server-express')

const config = require('./config')
const logger = require('./config/logger')
const httpErrorsHandling = require('./middlewares/errors-handling').httpErrorsHandling
const graphqlErrorsHandling = require('./middlewares/errors-handling').graphqlErrorsHandling
const requestInfos = require('./middlewares/request-infos').requestInfos
const getLanguage = require('./middlewares/get-language')
const getToken = require('./middlewares/token-handling').getToken
const getSecretKey = require('./tools').getSecretKey
const authenticationRouter = require('./authentication/routes')
const grahpqlContext = require('./middlewares/graphql-context')

const app = express()
const secretKey = getSecretKey()
const { schema, resolver } = glue('src/graphql')
const graphqlServer = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
  context: grahpqlContext,
  formatError: graphqlErrorsHandling
})

app.use(
  cors({
    allowedHeaders: ['Content-Type, Authorization, Language'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
  }),
  bodyParser.json(),
  expressJwt({
    secret: secretKey,
    credentialsRequired: false,
    getToken
  }).unless({
    path: ['/authentication/resend-confirm-email', '/authentication/resend-reset-password-email']
  }),
  requestInfos,
  getLanguage
)

graphqlServer.applyMiddleware({ app, path: '/graphql' })

app.use('/authentication', authenticationRouter)

app.use(httpErrorsHandling)

app.listen(config.PORT, () => logger.info('App listening on port ' + config.PORT))
