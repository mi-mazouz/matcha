const winston = require('winston')

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.simple(),
)

const logger = winston.createLogger({
  level: 'error',
  levels: {
    debug: 0,
    info: 1,
    warning: 2,
    error: 3
  },
  transports: [
    new winston.transports.Console({
      format,
    })
  ]
})

module.exports = logger