const createError = require('http-errors')
const bcrypt = require('bcrypt')

const errors = require('../../errors')
const signUpService = require('./service')
const utils = require('../../utils')

module.exports = (req, res, next) => {
  if (!utils.isName(req.body.firstName)) return next(createError.BadRequest(errors.FIRST_NAME_WRONG_FORMAT))
  if (!utils.isName(req.body.lastName)) return next(createError.BadRequest(errors.LAST_NAME_WRONG_FORMAT))
  if (!utils.isUsername(req.body.username)) return next(createError.BadRequest(errors.USERNAME_WRONG_FORMAT))
  if (!utils.isBirthDate(req.body.birthDate)) return next(createError.BadRequest(errors.BIRTH_DATE_WRONG_FORMAT))
  if (!utils.isEmail(req.body.email)) return next(createError.BadRequest(errors.EMAIL_WRONG_FORMAT))
  if (!utils.isPassword(req.body.password)) return next(createError.BadRequest(errors.PASSWOR_WRONG_FORMAT))

  return bcrypt.hash(req.body.password, 10)
  .then((encryptPassword) => {
    return signUpService(
      utils.capitalizeName(req.body.firstName),
      utils.capitalizeName(req.body.lastName),
      req.body.username,
      new Date(req.body.birthDate),
      req.body.email,
      encryptPassword
    )
  })
  .then((token) => res.send({ token }))
  .catch(next)
}