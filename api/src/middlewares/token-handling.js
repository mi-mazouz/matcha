const createError = require('http-errors')

const errors = require('../errors')

const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) return req.query.token

  return null
}

const getTokenFromParams = (req) => {
  if (req.params && req.params.token) return req.params.token

  return null
}

const userToken = (req, _, next) => {
  if (!req.user) return next(createError.Unauthorized(errors.BAD_TOKEN))

  return next()
}

const confirmEmailToken = (req, _, next) => {
  if (!req.user || !req.user.emailConfirming) return next(createError.Unauthorized(errors.BAD_TOKEN))

  return next()
}

module.exports = {
  confirmEmailToken,
  getToken,
  getTokenFromParams,
  userToken
}