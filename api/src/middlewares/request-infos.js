const logger = require('../config/logger')

const requestInfos = (req, _, next) => {
  logger.info(
    JSON.stringify({
      method: req.method,
      route: req.path,
      body: req.body,
      params: req.params,
      query: req.query
    })
  )

  return next()
}

module.exports = {
  requestInfos
}
