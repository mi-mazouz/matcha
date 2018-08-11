const createError = require('http-errors')

const UserModel = require('../../../database/models').User
const errors = require('../../errors')

module.exports = (userId) => {
  return UserModel.findById(userId)
  .then((user) => {
    if (!user) throw createError.BadRequest(errors.INVALID_EMAIL_OR_PASSWORD)

    return user.update({ emailConfirmed : true })
  })
}