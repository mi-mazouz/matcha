const resendResetPasswordEmailService = require('./service')

module.exports = (req, res, next) => {
  return resendResetPasswordEmailService(req.user.id)
  .then(() => res.send({ status: 'OK' }))
  .catch(next)
}
