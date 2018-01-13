const logger = require('../services/logger')

const errorsHandling = (err, req, res, next) => {
  logger.error(JSON.stringify({
    route: req.path,
    status: err.statusCode,
    message: err.message
  }))

  if (!err.statusCode) {
    return next(err)
  }

  res.status(err.statusCode).json({message: err.message})
}

module.exports = {
  errorsHandling
}
