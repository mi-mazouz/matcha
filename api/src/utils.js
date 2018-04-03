const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const cryptoRandomString = require('crypto-random-string')

const buildToken = (userId) => {
  return jwt.sign(
    {userId: userId.toString()},
    fs.readFileSync(path.join(__dirname, '../config/secret.key'))
  )
}

const buildRandomString = (size) => {
  return cryptoRandomString(size)
}

const transporter = nodeMailer.createTransport({
  host: 'xxx',
  port: 587,
  auth: {
    user: 'xxx',
    pass: 'xxx'
  }
})

module.exports = {
  buildToken,
  transporter,
  // parsePictures,
  buildRandomString
}
