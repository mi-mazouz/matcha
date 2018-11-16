const createError = require('http-errors')
const { has } = require('lodash')

const infosService = require('./service')
const errors = require('../../config/errors')

module.exports = (req, res, next) => {
  if (!has(req, 'user.id')) return next(createError.BadRequest(errors.BAD_TOKEN))

  return infosService(req.user.id)
  .then(userInfos => res.send(userInfos))
  .catch(next)
}
