const createError = require('http-errors')

const userService = require('../services/user')
const locationService = require('../services/location')

const errors = require('../errors')

const postLocation = (req, res, next) => {
  return Promise.all([
    userService.getById(req.user.id),
    locationService.getLocation()
  ])
  .then(([user, location]) => {
    if (!user) return next(createError.NotFound(errors.USER_NOT_FOUND))

    res.send({location: location.data})
    return userService.patch(user, {location: location.data})
  })
  .catch(next)
}

module.exports = {
  postLocation
}
