const createError = require('http-errors')

const UserModel = require('../../database/models').User
const logger = require('../../services/logger')
const utils = require('../../utils')
const errors = require('../../errors')

module.exports = (gender, lookingFor, username, birthDate, email, password) => {
  logger.info(`A user tried to register with email: ${email} and username: ${username}`)

  return UserModel.findOne({ where: { email } })
  .then((user) => {
    if (user) throw createError.BadRequest(errors.EMAIL_ALREADY_EXISTS)

    return UserModel.create(gender, lookingFor, username, birthDate, email, password)
    .then((user) => {
      // send email activation
      return utils.buildToken(user.id)
    })
  })
}