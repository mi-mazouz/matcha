const refreshTokenService = require('./service')
const buildToken = require('../../tools/token').buildToken

module.exports = (req, res, next) => {
  return refreshTokenService(req.user.id)
  .then(user => res.send({ token: buildToken(user.id) }))
  .catch(next)
}
