const createError = require('http-errors')

const UserModel = require('../../../database/models').User
const logger = require('../../config/logger')
const errors = require('../../config/errors')
const sendConfirmEmail = require('../../tools/mail').sendConfirmEmail
const { buildEmailConfirmToken, buildToken } = require('../../tools/token')

module.exports = (firstName, lastName, username, birthDate, email, password, language) => {
  logger.info(`A user tried to register with email: ${email} and username: ${username}`)

  return UserModel.findOne({ where: { email } })
  .then(user => {
    if (user) throw createError.BadRequest(errors.EMAIL_ALREADY_EXISTS)

    return new UserModel({ firstName, lastName, username, birthDate, email, password })
    .save()
    .then(user => {
      sendConfirmEmail(
        {
          firstName: user.firstName,
          email: user.email,
          language: language
        },
        buildEmailConfirmToken(user.id)
      )

      return {
        userId: user.id,
        token: buildToken(user.id)
      }
    })
  })
}
