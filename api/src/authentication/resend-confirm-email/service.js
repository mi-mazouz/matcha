const createError = require('http-errors')

const UserModel = require('../../../database/models').User
const errors = require('../../config/errors')
const tokenTools = require('../../tools/token')
const sendConfirmEmail = require('../../tools/mail').sendConfirmEmail

module.exports = (userId, language) => {
  return UserModel.findById(userId).then(user => {
    if (!user) throw createError.BadRequest(errors.USER_NOT_FOUND)

    return sendConfirmEmail(
      {
        firstName: user.firstName,
        email: user.email,
        language: language
      },
      tokenTools.buildEmailConfirmToken(user.id)
    )
  })
}
