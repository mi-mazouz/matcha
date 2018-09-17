const createError = require('http-errors')
const _ = require('lodash')

const errors = require('../../config/errors')
const forgotPasswordService = require('./service')

module.exports = (req, res, next) => {
  if (!_.has(req, 'body.email') || _.isEmpty(req.body.email))
    return next(createError.BadRequest(errors.EMAIL_MISSING))

  return forgotPasswordService(req.body.email, req.user.language)
  .then(() => res.send({ status: 'OK' }))
  .catch(next)
}
