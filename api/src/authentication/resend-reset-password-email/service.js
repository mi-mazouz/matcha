const createError = require('http-errors')

const UserModel = require('../../../database/models').User
const errors = require('../../config/errors')
const tokenTools = require('../../tools/token')
const sendForgotPasswordEmail = require('../../tools/mail').sendForgotPasswordEmail

module.exports = userId => {
  return UserModel.findById(userId).then(user => {
    if (!user) throw createError.BadRequest(errors.USER_NOT_FOUND)

    return sendForgotPasswordEmail(
      {
        firstName: user.firstName,
        email: user.email
      },
      tokenTools.buildEmailResetPasswordToken(user.id)
    )
  })
}
