const createError = require('http-errors')

const errors = require('../config/errors')
const UserModel = require('../../database/models').User

module.exports = ({ req }) => {
  // fix promiseWarning when throw error
  if (!req.user || !req.user.id) throw req.next(createError.Unauthorized(errors.BAD_TOKEN))

  return UserModel.findById(req.user.id)
  .then(user => ({ userAuthenticated: user }))
}
