const _ = require('lodash')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const errors = require('../errors')
const userService = require('../services/user')

const userJwt = (req, res, next) => {
  if (!_.has(req, 'user')) return next(createError.BadRequest(errors.TOKEN_INVALID))
  return next()
}

const decodetoken = (req, res, next) => {
  if (!_.has(req, 'headers.authorization')) return next()
  const token = req.headers.authorization

  jwt.verify(token, fs.readFileSync(path.join(__dirname, '../../config/secret.key')), (err, decoded) => {
    if (err || !decoded.userId) return next()

    req.token = decoded
    return userService.getById(decoded.userId)
    .then((user) => {
      req.user = user

      return next()
    })
  })
}

module.exports = {
  userJwt,
  decodetoken
}
