const env = process.env.NODE_ENV || 'development'
const config = require('../../config.' + env).default

export default config
