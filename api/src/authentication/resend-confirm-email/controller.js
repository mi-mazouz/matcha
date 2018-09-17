const resendConfirmEmailService = require('./service')

module.exports = (req, res, next) => {
  return resendConfirmEmailService(req.user.id, req.user.language)
  .then(() => res.send({ status: 'OK' }))
  .catch(next)
}
