const _ = require('lodash')

const postgreSql = require('../database/utils')
const config = require('../../config')

const create = (firstName, lastName, username, mail, encryptedPassword) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.insert(
      client,
      'users',
      'firstName, lastName, username, mail, password',
      `'${firstName}', '${lastName}', '${username}', '${mail}', '${encryptedPassword}'`
    )
    .then(() => postgreSql.selectWhere(client, '*', 'users', `mail='${mail}'`))
    .then((user) => {
      postgreSql.end(client)
      return Promise.resolve(user.rows[0])
    })
  })
}

const patch = (userId, body) => {
  const keys = Object.keys(body)
  const values = Object.values(body)

  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.updateWhere(
      client,
      'users',
      `${_.map((keys), (key, index) => `${key}='${values[index]}'` + `${(keys.length - 1) !== index ? ',' : ''}`).toString()}`,
      `id='${userId}'`
    )
    .then((user) => {
      postgreSql.end(client)

      if (!user.rows[0]) return Promise.resolve(null)
      return Promise.resolve(user.rows[0])
    })
  })
}

const getByMail = (mail) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.selectWhere(client, '*', 'users', `mail='${mail}'`)
    .then((user) => {
      postgreSql.end(client)

      if (!user.rows[0]) return Promise.resolve(null)
      return Promise.resolve(user.rows[0])
    })
  })
}

const getById = (id) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.selectWhere(client, '*', 'users', `id='${id}'`)
    .then((user) => {
      postgreSql.end(client)

      if (!user.rows[0]) return Promise.resolve(null)
      return Promise.resolve(user.rows[0])
    })
  })
}

module.exports = {
  create,
  getByMail,
  getById,
  patch
}
