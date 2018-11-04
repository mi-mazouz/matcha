const { LANGUAGES } = require('../config')

module.exports = (req, _, next) => {
  if (!req.user) req.user = {}

  if (req.query && req.query.language)
    req.user.language = LANGUAGES[LANGUAGES.indexOf(req.query.language)] || 'EN'
  else if (req.headers && req.headers.language)
    req.user.language = LANGUAGES[LANGUAGES.indexOf(req.headers.language)] || 'EN'
  else if (req.body && req.body.language)
    req.user.language = LANGUAGES[LANGUAGES.indexOf(req.body.language)] || 'EN'
  else req.user.language = 'EN'

  return next()
}
