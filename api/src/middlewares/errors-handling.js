const logger = require('../config/logger')
const errors = require('../config/errors')

const httpErrorsHandling = (err, req, res, next) => {
  logger.error(
    JSON.stringify({
      route: req.path,
      status: err.statusCode,
      message: err.message
    })
  )

  if (err.name === 'UnauthorizedError') {
    if (err.message === 'jwt expired' && req.path === '/authentication/refresh-token') {
      res.status(err.status)
      .json({ message: errors.USER_INACTIVE })
      return
    }
    if (err.message === 'jwt expired') {
      res.status(err.status)
      .json({ message: errors.TOKEN_EXPIRED })
      return
    }
    if (err.message === 'invalid signature') {
      res.status(err.status)
      .json({ message: errors.BAD_TOKEN })
      return
    }
  }

  if (!err.statusCode) {
    return next(err)
  }

  res.status(err.statusCode)
  .json({ message: err.message })
}

const graphqlErrorsHandling = error => {
  logger.error(
    JSON.stringify({
      route: error.extensions.exception.path,
      location: error.extensions.exception.locations,
      status: error.extensions.code,
      message: error.message
    })
  )

  return error
}

module.exports = {
  httpErrorsHandling,
  graphqlErrorsHandling
}
