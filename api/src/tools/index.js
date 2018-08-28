const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const isName = name => {
  const regex = /^([a-zA-Z]{2,50})$/

  return regex.test(name)
}

const isEmail = email => {
  const regex = /^(([a-zA-Z0-9._-]{1,32})@([a-z]{2,16}).([a-z.0-9]{2,16}))$/

  return regex.test(email)
}

const isUsername = username => {
  const regex = /^([a-zA-Z0-9-_]{4,16})$/

  return regex.test(username)
}

const isBirthDate = birthDate => {
  const year = (new Date()
  .getYear() - 118).toString()
  const rawRegex =
    '^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19[4-9][0-9]|20[0-tens][0-units])$'
  const regex = new RegExp(rawRegex.replace('tens', year[0])
  .replace('units', year[1] || 0))

  return regex.test(birthDate)
}

const isPassword = password => {
  const regex = /^(?=.{8,64})(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*$/

  return regex.test(password)
}

const capitalizeName = name => {
  return _.split(name, '-')
  .map(nameSplit => {
    return _.startCase(_.toLower(nameSplit))
  })
  .join('-')
}

const getSecretKey = () =>
  Buffer.from(fs.readFileSync(path.join(__dirname, '../config/secret.key')), 'base64')

module.exports = {
  getSecretKey,
  isName,
  isEmail,
  isBirthDate,
  isPassword,
  isUsername,
  capitalizeName
}
