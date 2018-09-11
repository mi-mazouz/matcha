const createError = require('http-errors')

const UserModel = require('../../../database/models').User
const errors = require('../../config/errors')

module.exports = (userId, newPassword) => {
  return UserModel.findById(userId).then(user => {
    if (!user) throw createError.BadRequest(errors.USER_NOT_FOUND)

    return user.update({ password: newPassword })
  })
}
