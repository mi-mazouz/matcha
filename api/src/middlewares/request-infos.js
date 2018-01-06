const logger = require('../services/logger')

const requestInfos = (req, res, next) => {
  logger.info(JSON.stringify({
    route: req.path,
    body: req.body,
    params: req.params,
    query: req.query
  }))

  return next()
}

module.exports = {
  requestInfos
}
