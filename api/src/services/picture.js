const postgreSql = require('../database/utils')
const config = require('../../config')

const create = (userId, profile, data) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.insert(
      client,
      'pictures',
      'userId, profile, data',
      `'${userId}', '${profile}', '${data}'`
    )
    .then((picture) => {
      postgreSql.end(client)
      return Promise.resolve(picture.rows[0])
    })
  })
}

const update = (id, newPicture) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.updateWhere(
      client,
      'pictures',
      `data='${newPicture}'`,
      `id='${id}'`
    )
    .then((picture) => {
      postgreSql.end(client)
      return Promise.resolve(picture.rows[0])
    })
  })
}

const getProfile = (userId) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.selectWhere(
      client,
      '*',
      'pictures',
      `userId='${userId}' AND profile='${true}'`
    )
    .then((profilePicture) => {
      postgreSql.end(client)

      if (!profilePicture.rows[0]) return Promise.resolve(null)
      return Promise.resolve(profilePicture.rows[0])
    })
  })
}

const getAll = (userId) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.selectWhere(client, '*', 'pictures', `userId='${userId}'`)
    .then((pictures) => {
      postgreSql.end(client)

      if (pictures.rows.length === 0) return Promise.resolve(null)
      return Promise.resolve(pictures.rows)
    })
  })
}

const getAllExceptProfile = (userId) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.selectWhere(client, '*', 'pictures', `userId='${userId}' AND profile='${false}'`)
    .then((pictures) => {
      postgreSql.end(client)

      return Promise.resolve(pictures.rows)
    })
  })
}

const remove = (id) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.deleteWhere(client, 'pictures', `id='${id}'`)
    .then(() => postgreSql.end(client))
  })
}

const count = (userId) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.count(client, '*', 'pictures')
    .then((number) => {
      postgreSql.end(client)

      return Promise.resolve(number.rowCount)
    })
  })
}

module.exports = {
  create,
  count,
  getAll,
  getAllExceptProfile,
  getProfile,
  update,
  remove
}
