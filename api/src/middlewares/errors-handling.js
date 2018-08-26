const logger = require('../services/logger')
const errors = require('../errors')

const errorsHandling = (err, req, res, next) => {
  logger.error(
    JSON.stringify({
      route: req.path,
      status: err.statusCode,
      message: err.message
    })
  )

  if (err.name === 'UnauthorizedError' && err.message === 'jwt expired') {
    res.status(err.status)
    .json({ message: errors.EMAIL_TOKEN_EXPIRED })
  }

  if (!err.statusCode) {
    return next(err)
  }

  res.status(err.statusCode)
  .json({ message: err.message })
}

module.exports = {
  errorsHandling
}
