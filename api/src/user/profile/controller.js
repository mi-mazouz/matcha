const createError = require('http-errors')
const { has } = require('lodash')

const profileService = require('./service')
const errors = require('../../config/errors')

module.exports = (req, res, next) => {
  if (!has(req, 'user.id') && !has(req, 'params.userId'))
    return next(createError.BadRequest(errors.USER_ID_MISSING))

  return profileService(req.user.id || req.params.userId)
  .then(profile => res.send(profile))
  .catch(next)
}
