const createError = require('http-errors')
const jwt = require('jsonwebtoken')

const errors = require('../config/errors')
const getSecretKey = require('../tools').getSecretKey

const getToken = req => {
  if (req.query && req.query.token) return req.query.token
  else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

const verifyToken = (token, ignoreExpiration) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getSecretKey(), { ignoreExpiration }, (error, decoded) => {
      if (error) return reject(error)
      return resolve(decoded)
    })
  })
}

const resendConfirmEmailToken = (req, _, next) => {
  const token = getToken(req)

  return verifyToken(token, true).then(decodedToken => {
    if (!decodedToken || !decodedToken.id || decodedToken.emailConfirming !== true) {
      return next(createError.Unauthorized(errors.BAD_TOKEN))
    }

    req.user = { id: decodedToken.id }
    return next()
  })
}

const resetPasswordToken = (req, _, next) => {
  const token = getToken(req)

  return verifyToken(token, true).then(decodedToken => {
    if (!decodedToken || !decodedToken.id || decodedToken.passwordReseting !== true) {
      return next(createError.Unauthorized(errors.BAD_TOKEN))
    }

    req.user = { id: decodedToken.id }
    return next()
  })
}

const confirmEmailToken = (req, _, next) => {
  if (req.user.emailConfirming !== true) return next(createError.Unauthorized(errors.BAD_TOKEN))

  return next()
}

module.exports = {
  confirmEmailToken,
  getToken,
  resendConfirmEmailToken,
  resetPasswordToken
}
