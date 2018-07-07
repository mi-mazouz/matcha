const createError = require('http-errors')
const _ = require('lodash')

const errors = require('../../errors')

module.exports = (req, res, next) => {
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