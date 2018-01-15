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

const getAll = (userId) => {
  return Picture.find({ userId, profile: false })
}

const remove = (_id) => {
  return Picture.remove({ _id })
}

const count = (userId) => {
  return Picture.count({ userId, profile: false })
}

module.exports = {
  create,
  count,
  getProfile,
  update,
  remove,
  getAll
}
