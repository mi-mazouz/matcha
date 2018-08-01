const createError = require('http-errors')
const bcrypt = require('bcrypt')
const moment = require('moment')
const _ = require('lodash')

const errors = require('../../errors')
const signUpService = require('./service')

module.exports = (req, res, next) => {
  if (!_.has(req, 'body.gender') || _.isEmpty(req.body.gender)) return next(createError.BadRequest(errors.GENDER_MISSING))
  if (!_.has(req, 'body.sexualOrientation') || _.isEmpty(req.body.sexualOrientation)) return next(createError.BadRequest(errors.SEXUAL_ORIENTATION_FOR_MISSING))
  if (!_.has(req, 'body.username') || _.isEmpty(req.body.username)) return next(createError.BadRequest(errors.USERNAME_MISSING))
  if (!_.has(req, 'body.birthDate') || _.isEmpty(req.body.birthDate)) return next(createError.BadRequest(errors.BIRTH_DATE_MISSING))
  if (!_.has(req, 'body.email') || _.isEmpty(req.body.email)) return next(createError.BadRequest(errors.EMAIL_MISSING))
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))
  else if (req.body.password.length > 64) return next(createError.BadRequest(errors.PASSWOR_TOO_LONG))

  return bcrypt.hash(req.body.password, 10)
  .then((encryptPassword) => {
    return signUpService(
      req.body.gender.toUpperCase(),
      req.body.sexualOrientation.toUpperCase(),
      req.body.username,
      moment(req.body.birthDate),
      req.body.email,
      encryptPassword
    )
  })
  .then((token) => res.send({ token }))
  .catch(next)
}