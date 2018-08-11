const createError = require('http-errors')

const UserModel = require('../../../database/models').User
const logger = require('../../services/logger')
const utils = require('../../utils')
const errors = require('../../errors')
const sendConfirmEmail = require('../../services/mail').sendConfirmEmail

module.exports = (firstName, lastName, username, birthDate, email, password) => {
  logger.info(`A user tried to register with email: ${email} and username: ${username}`)

  return UserModel.findOne({ where: { email } })
  .then((user) => {
    if (user) throw createError.BadRequest(errors.EMAIL_ALREADY_EXISTS)

    return new UserModel({ firstName, lastName, username, birthDate, email, password }).save()
    .then((user) => {
      sendConfirmEmail({
        firstName: user.firstName,
        email: user.email
      },
      utils.buildEmailConfirmToken(user.id))
      return utils.buildToken(user.id)
    })
  })
}