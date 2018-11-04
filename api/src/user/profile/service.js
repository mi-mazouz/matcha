const createError = require('http-errors')

const errors = require('../../config/errors')
const UserModel = require('../../../database/models').User
const PictureModel = require('../../../database/models').Picture

module.exports = userId => {
  return UserModel.findById(userId)
  .then(user => {
    if (!user) throw createError.BadRequest(errors.USER_NOT_FOUND)

    return PictureModel.findAll({ where: { userId } })
    .then(pictures => {
      if (pictures.length === 0) return { pictures: null, profilePicture: null }

      return {
        id: user.id,
        birthDate: user.birthDate,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        gender: user.gender,
        sexualOrientation: user.sexualOrientation,
        pictures: pictures.filter(picture => !picture.isProfile),
        profilePicture: { path: pictures.find(picture => picture.isProfile).path }
      }
    })
  })
}
