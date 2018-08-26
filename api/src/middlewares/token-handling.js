const createError = require('http-errors')

const errors = require('../errors')

const getToken = req => {
  if (req.query && req.query.token) return req.query.token
  else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

const userToken = (req, _, next) => {
  if (!req.user || !req.user.id) return next(createError.Unauthorized(errors.BAD_TOKEN))

  return next()
}

const confirmEmailToken = (req, _, next) => {
  if (!req.user || !req.user.id || !req.user.emailConfirming) {
    return next(createError.Unauthorized(errors.BAD_TOKEN))
  }

  return next()
}

module.exports = {
  confirmEmailToken,
  getToken,
  userToken
}
