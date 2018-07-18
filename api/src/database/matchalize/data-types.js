const moment = require('moment')

module.exports = {
  STRING: (length) => {
    if (!length) throw new Error('Length is required')
    else return String(length)
  },
  DATE: (dateString) => {
    if (!dateString) return new Date().toISOString()

    const error = new Error('Unexpected date format')
    const parsed = Date.parse(dateString)
    if (isNaN(parsed)) throw error
    else {
      const date = new Date(parsed)

      if (moment(date.toISOString()).isValid()) return date.toISOString()
      else throw error
    }
  }
}