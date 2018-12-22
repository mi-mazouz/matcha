const createError = require('http-errors')

const errors = require('../../config/errors')
const UserModel = require('../../../database/models').User

module.exports = userId => {
  return UserModel.findByPk(userId, {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    include: [
      {
        association: 'pictures',
        attributes: ['path', 'isProfile']
      }
    ]
  })
  .then(user => {
    if (!user) throw createError.BadRequest(errors.USER_NOT_FOUND)

    return user.infosFormat()
  })
}
