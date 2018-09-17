const createError = require('http-errors')

const UserModel = require('../../../database/models').User
const tokenTools = require('../../tools/token')
const errors = require('../../config/errors')
const sendForgotPasswordEmail = require('../../tools/mail').sendForgotPasswordEmail

module.exports = (email, language) => {
  return UserModel.findOne({ where: { email } }).then(user => {
    if (!user) throw createError.BadRequest(errors.USER_NOT_FOUND)

    return sendForgotPasswordEmail(
      {
        firstName: user.firstName,
        email: user.email,
        language: language
      },
      tokenTools.buildEmailResetPasswordToken(user.id)
    )
  })
}
