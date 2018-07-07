const connect = require('../connect')

const getByMail = (mail) => {
  return connect()
  .then((postgresClient) => {
    return postgresClient.query(`SELECT * FROM users WHERE mail = ${mail};`)
    .then((result) => {
      postgresClient.end()
      
      const user = JSON.parse(JSON.stringify(result))
      if (!user.rows[0]) return Promise.resolve(null)
      return Promise.resolve(user.rows[0])
    })
  })
}

module.exports = {
  getByMail
}
