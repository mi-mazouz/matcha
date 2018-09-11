const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const buildToken = userId => {
  return jwt.sign(
    { id: userId.toString() },
    fs.readFileSync(path.join(__dirname, '../config/secret.key')),
    { expiresIn: '1h' }
  )
}

const buildEmailResetPasswordToken = userId => {
  return jwt.sign(
    { id: userId.toString(), passwordReseting: true },
    fs.readFileSync(path.join(__dirname, '../config/secret.key')),
    { expiresIn: '1h' }
  )
}

const buildEmailConfirmToken = userId => {
  return jwt.sign(
    { id: userId.toString(), emailConfirming: true },
    fs.readFileSync(path.join(__dirname, '../config/secret.key')),
    { expiresIn: '1h' }
  )
}

module.exports = {
  buildToken,
  buildEmailResetPasswordToken,
  buildEmailConfirmToken
}
