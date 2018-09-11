const createError = require('http-errors')
const bcrypt = require('bcrypt')

const errors = require('../../config/errors')
const resetPasswordService = require('./service')
const tools = require('../../tools')

module.exports = (req, res, next) => {
  if (!tools.isPassword(req.body.password))
    return next(createError.BadRequest(errors.PASSWOR_WRONG_FORMAT))

  return bcrypt
  .hash(req.body.password, 10)
  .then(encryptPassword => resetPasswordService(req.user.id, encryptPassword))
  .then(() => res.send({ status: 'OK' }))
  .catch(next)
}
