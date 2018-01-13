const createError = require('http-errors')
const _ = require('lodash')

const authenticationService = require('../services/authentication')
const userService = require('../services/user')
const errors = require('../errors')
const constants = require('../constants')

const signup = (req, res, next) => {
  if (!_.has(req, 'body.firstName') || _.isEmpty(req.body.firstName)) return next(createError.BadRequest(errors.FIRST_NAME_MISSING))
  if (req.body.firstName.length > constants.FIRST_NAME_MAX_SIZE) return next(createError.BadRequest(errors.FIRST_NAME_TOO_LONG))

  if (!_.has(req, 'body.lastName') || _.isEmpty(req.body.lastName)) return next(createError.BadRequest(errors.LAST_NAME_MISSING))
  if (req.body.lastName.length > constants.LAST_NAME_MAX_SIZE) return next(createError.BadRequest(errors.LAST_NAME_TOO_LONG))

  if (!_.has(req, 'body.userName') || _.isEmpty(req.body.userName)) return next(createError.BadRequest(errors.USERNAME_MISSING))
  if (req.body.userName.length > constants.USERNAME_MAX_SIZE) return next(createError.BadRequest(errors.USERNAME_TOO_LONG))

  if (!_.has(req, 'body.mail') || _.isEmpty(req.body.mail)) return next(createError.BadRequest(errors.MAIL_MISSING))
  if (req.body.mail.length > constants.MAIL_MAX_SIZE) return next(createError.BadRequest(errors.MAIL_TOO_LONG))

  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))
  if (req.body.password.length < constants.PASSWORD_MIN_SIZE) return next(createError.BadRequest(errors.PASSWORD_TOO_SHORT))
  if (req.body.password.length > constants.PASSWORD_MAX_SIZE) return next(createError.BadRequest(errors.PASSWORD_TOO_LONG))

  return authenticationService.signup(
    req.body.firstName,
    req.body.lastName,
    req.body.userName,
    req.body.mail.toLowerCase(),
    req.body.password
  )
  .then((token) => {
    res.send({ token })
  })
  .catch(next)
}

const signin = (req, res, next) => {
  if (!_.has(req, 'body.mail') || _.isEmpty(req.body.mail)) return next(createError.BadRequest(errors.MAIL_MISSING))
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))

  return authenticationService.signin(
    req.body.mail,
    req.body.password
  )
  .then((token) => {
    res.send({token})
  })
  .catch(next)
}

const resetPassword = (req, res, next) => {
  if (!_.has(req, 'body.mail') || _.isEmpty(req.body.mail)) return next(createError.BadRequest(errors.MAIL_MISSING))

  return userService.getByMail(req.body.mail)
  .then((user) => {
    if (!user) throw createError.NotFound(errors.MAIL_NOT_FOUND)

    return authenticationService.resetPassword(user)
  })
  .then(() => res.send({status: 'OK'}))
  .catch(next)
}

module.exports = {
  signup,
  signin,
  resetPassword
}
