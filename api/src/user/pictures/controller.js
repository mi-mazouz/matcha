const createError = require('http-errors')
const { has, isNumber, isNaN } = require('lodash')

const profileService = require('./service')
const errors = require('../../config/errors')

module.exports = (req, res, next) => {
  if (!has(req, 'query.userId')) return next(createError.BadRequest(errors.USER_ID_MISSING))
  if (isNaN(parseInt(req.query.userId, 10)) || !isNumber(parseInt(req.query.userId, 10)))
    return next(createError.BadRequest(errors.WRONG_USER_ID))

  return profileService(req.query.userId)
  .then(profile => res.send(profile))
  .catch(next)
}
