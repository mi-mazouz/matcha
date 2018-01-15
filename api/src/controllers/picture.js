const createError = require('http-errors')
const _ = require('lodash')

const pictureService = require('../services/picture')
const errors = require('../errors')
const constants = require('../constants')
const utils = require('../utils')

const saveProfile = (req, res, next) => {
  if (!_.has(req, 'body.picture')) return next(createError.BadRequest(errors.PHOTO_MISSING))

  return pictureService.getProfile(req.user.id)
  .then((pictureProfile) => {
    if (!pictureProfile) return pictureService.create(req.user.id, true, req.body.picture)

    return pictureService.update(pictureProfile, req.body.picture)
  })
  .then((updatedPictureProfile) => res.send({ profilePicture: updatedPictureProfile.data }))
  .catch(next)
}

const save = (req, res, next) => {
  if (!_.has(req, 'body.pictures')) return next(createError.BadRequest(errors.PHOTO_MISSING))

  return pictureService.count(req.user.id)
  .then((numberOfPictures) => {
    if (numberOfPictures + req.body.pictures.length > constants.MAX_NUMBER_OF_PICTURES) return Promise.reject(createError.BadRequest(errors.TOO_MUCH_PICTURES))

    return Promise.all(req.body.pictures.map((picture) => {
      return pictureService.create(req.user.id, false, picture)
    }))
    .then(() => pictureService.getAll(req.user.id))
    .then((pictures) => res.send({ pictures: utils.parsePictures(pictures) }))
  })
  .catch(next)
}

const remove = (req, res, next) => {
  if (!_.has(req, 'body.picture')) return next(createError.BadRequest(errors.PHOTO_MISSING))

  return pictureService.remove(req.body.picture.id)
  .then(() => pictureService.getAll(req.user.id))
  .then((pictures) => res.send({ pictures: utils.parsePictures(pictures) }))
  .catch(next)
}

module.exports = {
  saveProfile,
  save,
  remove
}
