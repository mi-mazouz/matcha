const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const buildToken = (userId) => {
  return jwt.sign(
    {userId: userId.toString()},
    fs.readFileSync(path.join(__dirname, '../config/secret.key'))
  )
}

module.exports = {
  buildToken
}
