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
      profilePicture: pictureProfile.data,
      mail: user.mail,
      firstName: user.firstName,
      lastName: user.lastName
    })
  })
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
      lastName: updatedUser.lastName
    })
  })
}

module.exports = {
  getInfos,
  updateInfos
}
