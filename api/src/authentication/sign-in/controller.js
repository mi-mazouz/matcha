const createError = require('http-errors')
const _ = require('lodash')

const errors = require('../../errors')
const signInService = require('./service')

module.exports = (req, res, next) => {
  if (!_.has(req, 'body.email') || _.isEmpty(req.body.email))
    return next(createError.BadRequest(errors.EMAIL_MISSING))
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password))
    return next(createError.BadRequest(errors.PASSWORD_MISSING))

  return signInService(req.body.email, req.body.password)
  .then(token => res.send({ token }))
  .catch(next)
}
