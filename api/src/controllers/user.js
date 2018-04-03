const createError = require('http-errors')
const _ = require('lodash')

const userService = require('../services/user')
const pictureService = require('../services/picture')
const errors = require('../errors')
const constants = require('../constants')

const getInfos = (req, res, next) => {
  return userService.getById(req.user.id)
  .then((user) => {
    if (!user) return next(createError.NotFound(errors.USER_NOT_FOUND))

    return Promise.all([
      pictureService.getAllExceptProfile(req.user.id),
      pictureService.getProfile(req.user.id)
    ])
    .then(([pictures, profilePicture]) => {
      user['pictures'] = pictures
      user['profilePicture'] = profilePicture

      res.send(_.pick(user, [
        'firstname',
        'lastname',
        'gender',
        'pictures',
        'profilePicture',
        'mail',
        'biography'
      ]))
    })
  })
  .catch(next)
}

const updateInfos = (req, res, next) => {
  if (_.has(req, 'body.biography') && req.body.biography.length > constants.BIO_MAX_SIZE) return next(createError.BadRequest(errors.BIO_TOO_LONG))
  if (_.has(req, 'body.mail') && req.body.mail.length > constants.MAIL_MAX_SIZE) return next(createError.BadRequest(errors.MAIL_TOO_LONG))
  if (_.has(req, 'body.firstName') && req.body.firstName.length > constants.FIRST_NAME_MAX_SIZE) return next(createError.BadRequest(errors.FIRST_NAME_TOO_LONG))
  if (_.has(req, 'body.lastName') && req.body.lastName.length > constants.LAST_NAME_MAX_SIZE) return next(createError.BadRequest(errors.LAST_NAME_TOO_LONG))
  if (_.has(req, 'body.gender') && ['Male', 'Female'].indexOf(req.body.gender) === -1) return next(createError.BadRequest(errors.GENDER_UNKNOWN))

  return userService.patch(req.user.id, req.body)
  .then((updatedUser) => res.send(_.pick(updatedUser, [
    'firstname',
    'lastname',
    'gender',
    'mail',
    'biography'
  ])))
  .catch(next)
}

module.exports = {
  getInfos,
  updateInfos
}
