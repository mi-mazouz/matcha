const createError = require('http-errors')
const { has } = require('lodash')

const infosService = require('./service')
const errors = require('../../config/errors')

module.exports = (req, res, next) => {
  if (!has(req, 'query.userId')) return next(createError.BadRequest(errors.USER_ID_MISSING))

  return infosService(req.query.userId)
  .then(userInfos => res.send(userInfos))
  .catch(next)
}
