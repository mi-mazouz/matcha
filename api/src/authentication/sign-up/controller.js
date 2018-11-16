const createError = require('http-errors')
const bcrypt = require('bcrypt')

const errors = require('../../config/errors')
const signUpService = require('./service')
const tools = require('../../tools')

module.exports = (req, res, next) => {
  if (!tools.isName(req.body.firstName))
    return next(createError.BadRequest(errors.FIRST_NAME_WRONG_FORMAT))
  if (!tools.isName(req.body.lastName))
    return next(createError.BadRequest(errors.LAST_NAME_WRONG_FORMAT))
  if (!tools.isUsername(req.body.username))
    return next(createError.BadRequest(errors.USERNAME_WRONG_FORMAT))
  if (!tools.isBirthDate(req.body.birthDate))
    return next(createError.BadRequest(errors.BIRTH_DATE_WRONG_FORMAT))
  if (!tools.isEmail(req.body.email)) return next(createError.BadRequest(errors.EMAIL_WRONG_FORMAT))
  if (!tools.isPassword(req.body.password))
    return next(createError.BadRequest(errors.PASSWOR_WRONG_FORMAT))

  return bcrypt
  .hash(req.body.password, 10)
  .then(encryptPassword => {
    return signUpService(
      tools.capitalizeName(req.body.firstName),
      tools.capitalizeName(req.body.lastName),
      req.body.username,
      new Date(req.body.birthDate),
      req.body.email,
      encryptPassword,
      req.user.language
    )
  })
  .then(token => res.send(token))
  .catch(next)
}
