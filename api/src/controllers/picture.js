const createError = require('http-errors')
const _ = require('lodash')

const pictureService = require('../services/picture')
const errors = require('../errors')
const constants = require('../constants')

const saveProfile = (req, res, next) => {
  if (!_.has(req, 'body.picture')) return next(createError.BadRequest(errors.PHOTO_MISSING))

  return pictureService.getProfile(req.user.id)
  .then((pictureProfile) => {
    if (!pictureProfile) return pictureService.create(req.user.id, true, req.body.picture)

    return pictureService.update(pictureProfile.id, req.body.picture)
  })
  .then((newPictureProfile) => res.send({ profilePicture: newPictureProfile }))
  .catch(next)
}

const saveAllExceptProfile = (req, res, next) => {
  if (!_.has(req, 'body.pictures')) return next(createError.BadRequest(errors.PHOTO_MISSING))

  return pictureService.count(req.user.id)
  .then((numberOfPictures) => {
    if (numberOfPictures + req.body.pictures.length > constants.MAX_NUMBER_OF_PICTURES) {
      throw createError.BadRequest(errors.TOO_MUCH_PICTURES)
    }

    return Promise.all(req.body.pictures.map((picture) => {
      return pictureService.create(req.user.id, false, picture)
    }))
    .then((pictures) => res.send(pictures))
  })
  .catch(next)
}

const remove = (req, res, next) => {
  if (!_.has(req, 'body.picture')) return next(createError.BadRequest(errors.PHOTO_MISSING))

  return pictureService.remove(req.body.picture.id)
  .then(() => pictureService.getAllExceptProfile(req.user.id))
  .then((pictures) => res.send({ pictures }))
  .catch(next)
}

module.exports = {
  saveProfile,
  saveAllExceptProfile,
  remove
}
