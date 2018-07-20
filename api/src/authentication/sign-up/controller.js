const createError = require('http-errors')
const _ = require('lodash')

const errors = require('../../errors')
const signUpService = require('./service')

module.exports = (req, res, next) => {
  if (!_.has(req, 'body.gender') || _.isEmpty(req.body.email)) return next(createError.BadRequest(errors.GENDER_MISSING))
  if (!_.has(req, 'body.lokingFor') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.LOOKING_FOR_MISSING))
  if (!_.has(req, 'body.username') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.USERNAME_MISSING))
  if (!_.has(req, 'body.birthDate') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.BIRTH_DATE_MISSING))
  if (!_.has(req, 'body.email') || _.isEmpty(req.body.email)) return next(createError.BadRequest(errors.EMAIL_MISSING))
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))

  return signUpService(
    req.body.gender,
    req.body.lookingFor,
    req.body.username,
    req.body.birthDate,
    req.body.email,
    req.body.password
  )
  .then((token) => res.send({ token }))
  .catch(next)
}