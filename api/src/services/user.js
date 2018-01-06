const User = require('../models/user')

const create = (firstName, lastName, username, mail, encryptedPassword) => {
  return new User({
    firstName,
    lastName,
    username,
    mail,
    password: encryptedPassword,
    emailConfirmed: false
  }).save()
}

const getByMail = (mail) => {
  return User.findOne({ mail })
}

const getById = (id) => {
  return User.findById(id)
}

module.exports = {
  create,
  getByMail,
  getById
}
