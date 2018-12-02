const createError = require('http-errors')
const bcrypt = require('bcrypt')

const UserModel = require('../../../database/models').User
const logger = require('../../config/logger')
const errors = require('../../config/errors')
const { buildToken } = require('../../tools/token')

module.exports = (email, password) => {
  logger.info(`A user tried to login with email: ${email}`)

  return UserModel.findOne({ where: { email } })
  .then(user => {
    if (!user) throw createError.BadRequest(errors.INVALID_EMAIL_OR_PASSWORD)

    return bcrypt.compare(password, user.password)
    .then(passwordMatched => {
      if (!passwordMatched) throw createError.BadRequest(errors.INVALID_EMAIL_OR_PASSWORD)

      return buildToken(user.id)
    })
  })
}
