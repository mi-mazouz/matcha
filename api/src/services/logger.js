const winston = require('winston')

winston.level = 'debug'
winston.default.transports.console.colorize = true

module.exports = winston
