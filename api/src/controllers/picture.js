const createError = require('http-errors')
const _ = require('lodash')

const pictureService = require('../services/picture')
const errors = require('../errors')

const saveProfile = (req, res, next) => {
  if (!_.has(req, 'body.picture')) return next(createError.BadRequest(errors.PHOTO_MISSING))

  return pictureService.getProfile(req.user.id)
  .then((pictureProfile) => {
    if (!pictureProfile) return pictureService.create(req.user.id, true, req.body.picture)

    return pictureService.update(pictureProfile, req.body.picture)
  })
  .then((pictureProfile) => {
    res.send({ profilePicture: pictureProfile.data })
  })
  .catch(next)
}

module.exports = {
  saveProfile
}
