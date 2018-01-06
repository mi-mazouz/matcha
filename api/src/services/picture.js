const Picture = require('../models/picture')

const create = (userId, profile, data) => {
  return new Picture({
    userId,
    profile,
    data
  }).save()
}

const update = (oldPicture, newPicture) => {
  oldPicture['data'] = newPicture
  oldPicture['updatedDate'] = Date.now()

  return oldPicture.save()
}

const getProfile = (userId) => {
  return Picture.findOne({ userId, profile: true })
}

module.exports = {
  create,
  getProfile,
  update
}
