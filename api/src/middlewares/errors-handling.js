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
    if (err.message === 'jwt expired') {
      res.status(err.status).json({ message: errors.TOKEN_EXPIRED })
      return
    } else if (err.message === 'invalid signature') {
      res.status(err.status).json({ message: errors.BAD_TOKEN })
      return
    }
  }

  if (!err.statusCode) {
    return next(err)
  }

  res.status(err.statusCode).json({ message: err.message })
}

const graphqlErrorsHandling = error => {
  const errorMessage = error.message.split(':')[1].trim()

  logger.error(
    JSON.stringify({
      route: error.path,
      location: error.locations,
      status: error.extensions.code,
      message: errorMessage
    })
  )

  error.message = errorMessage
  return error
}

module.exports = {
  httpErrorsHandling,
  graphqlErrorsHandling
}
