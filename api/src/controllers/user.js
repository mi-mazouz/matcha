const createError = require('http-errors')

const userService = require('../services/user')
const pictureService = require('../services/picture')
const errors = require('../errors')

const getInfos = (req, res, next) => {
  return Promise.all([
    userService.getById(req.user.id),
    pictureService.getProfile(req.user.id)
  ])
  .then(([user, pictureProfile]) => {
    if (!user) return next(createError.NotFound(errors.USER_NOT_FOUND))

    res.send({
      profilePicture: pictureProfile ? pictureProfile.data : null,
      mail: user.mail,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio
    })
  })
  .catch(next)
}

const updateInfos = (req, res, next) => {
  return userService.getById(req.user.id)
  .then((user) => {
    if (!user) return next(createError.NotFound(errors.USER_NOT_FOUND))

    return userService.patchUser(user, req.body)
  })
  .then((updatedUser) => {
    res.send({
      mail: updatedUser.mail,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      bio: updatedUser.bio
    })
  })
  .catch(next)
}

module.exports = {
  getInfos,
  updateInfos
}
