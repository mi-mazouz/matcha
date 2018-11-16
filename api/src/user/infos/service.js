const createError = require('http-errors')

const errors = require('../../config/errors')
const UserModel = require('../../../database/models').User

module.exports = userId => {
  return UserModel.findById(userId)
  .then(user => {
    if (!user) throw createError.BadRequest(errors.USER_NOT_FOUND)

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  })
}
