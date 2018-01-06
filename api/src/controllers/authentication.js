const createError = require('http-errors')
const _ = require('lodash')

const authenticationService = require('../services/authentication')
const userService = require('../services/user')
const errors = require('../errors')

const signup = (req, res, next) => {
  if (!_.has(req, 'body.firstName') || _.isEmpty(req.body.firstName)) return next(createError.BadRequest(errors.FIRST_NAME_MISSING))
  if (!_.has(req, 'body.lastName') || _.isEmpty(req.body.lastName)) return next(createError.BadRequest(errors.LAST_NAME_MISSING))
  if (!_.has(req, 'body.userName') || _.isEmpty(req.body.userName)) return next(createError.BadRequest(errors.USERNAME_MISSING))
  if (!_.has(req, 'body.mail') || _.isEmpty(req.body.mail)) return next(createError.BadRequest(errors.EMAIL_MISSING))
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))
  if (req.body.password.length < 8) return next(createError.BadRequest(errors.PASSWORD_TO_SHORT))

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
  if (!_.has(req, 'body.mail') || _.isEmpty(req.body.mail)) return next(createError.BadRequest(errors.EMAIL_MISSING))
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))
  if (req.body.password.length < 8) return next(createError.BadRequest(errors.PASSWORD_TO_SHORT))

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
  if (!_.has(req, 'body.mail') || _.isEmpty(req.body.mail)) return next(createError.BadRequest(errors.EMAIL_MISSING))

  return userService.getByMail(req.body.mail)
  .then((user) => {
    if (!user) throw createError.NotFound(errors.EMAIL_NOT_FOUND)

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
