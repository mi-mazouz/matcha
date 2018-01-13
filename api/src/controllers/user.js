const createError = require('http-errors')
const _ = require('lodash')

const userService = require('../services/user')
const pictureService = require('../services/picture')
const errors = require('../errors')
const constants = require('../constants')

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
  if (_.has(req, 'body.bio') && req.body.bio.length > constants.BIO_MAX_SIZE) return next(createError.BadRequest(errors.BIO_TOO_LONG))
  if (_.has(req, 'body.mail') && req.body.mail.length > constants.MAIL_MAX_SIZE) return next(createError.BadRequest(errors.MAIL_TOO_LONG))
  if (_.has(req, 'body.firstName') && req.body.firstName.length > constants.FIRST_NAME_MAX_SIZE) return next(createError.BadRequest(errors.FIRST_NAME_TOO_LONG))
  if (_.has(req, 'body.lastName') && req.body.lastName.length > constants.LAST_NAME_MAX_SIZE) return next(createError.BadRequest(errors.LAST_NAME_TOO_LONG))

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
