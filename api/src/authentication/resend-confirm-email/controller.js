const resendConfirmEmailService = require('./service')

module.exports = (req, res, next) => {
  return resendConfirmEmailService(req.user.id)
  .then(() => res.send({ status: 'OK' }))
  .catch(next)
}
