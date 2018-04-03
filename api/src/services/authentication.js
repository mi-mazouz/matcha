const createError = require('http-errors')
const bcrypt = require('bcrypt')

const utils = require('../utils')
const userService = require('../services/user')
const mailService = require('../services/mail')
const logger = require('../services/logger')
const errors = require('../errors')

const signup = (firstName, lastName, username, mail, password) => {
  return userService.getByMail(mail)
  .then((user) => {
    if (user) throw createError.BadRequest(errors.MAIL_EXISTS)

    return bcrypt.hash(password, 10)
  })
  .then((encryptedPassword) => {
    return userService.create(
      firstName,
      lastName,
      username,
      mail,
      encryptedPassword
    )
  })
  .then((user) => {
    // mailService.sendConfirmationMail(user.mail, user.firstName)
    return utils.buildToken(user._id)
  })
}

const signin = (mail, password) => {
  logger.info(`A user tried to login with email: ${mail}`)

  return userService.getByMail(mail)
  .then((user) => {
    if (!user) throw createError.BadRequest(errors.SIGNIN)

    return bcrypt.compare(password, user.password)
    .then((passwordMatched) => {
      if (!passwordMatched) throw createError.BadRequest(errors.SIGNIN)

      return utils.buildToken(user.id)
    })
  })
}

const resetPassword = (user) => {
  const newPassword = utils.buildRandomString(8)

  mailService.sendResetPasswordMail(
    user.mail,
    user.firstName,
    newPassword
  )

  return bcrypt.hash(newPassword, 10)
  .then((newEncryptedPassword) => {
    return userService.patch(user.id, {password: newEncryptedPassword})
  })
}

module.exports = {
  signup,
  signin,
  resetPassword
}
