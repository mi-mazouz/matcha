const createError = require('http-errors')
const { has } = require('lodash')

const profileService = require('./service')
const errors = require('../../config/errors')

module.exports = (req, res, next) => {
  if (!has(req, 'user.id') && !has(req, 'query.userId'))
    return next(createError.BadRequest(errors.USER_ID_MISSING))
  if (req.query.userId === req.user.id) return next(createError.BadRequest(errors.FETCH_SELF_USER))

  return profileService(req.query.userId || req.user.id)
  .then(profile => res.send(profile))
  .catch(next)
}
