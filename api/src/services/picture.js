const postgreSql = require('../database/utils')
const config = require('../../config')

// const create = (userId, profile, data) => {
//   return new Picture({
//     userId,
//     profile,
//     data
//   }).save()
// }
//
// const update = (oldPicture, newPicture) => {
//   oldPicture['data'] = newPicture
//   oldPicture['updatedDate'] = Date.now()
//
//   return oldPicture.save()
// }
//
// const getProfileByUserId = (userId) => {
//   return postgreSql.connect(config.DATABASE)
//   .then((client) => {
//     return postgreSql.selectWhere(
//       client,
//       '*',
//       'pictures',
//       `userId='${userId}' AND profile='${true}'`
//     )
//     .then((picture) => {
//       postgreSql.end(client)
//
//       if (!picture.rows[0]) return Promise.resolve(null)
//       return Promise.resolve(user.rows[0])
//     })
//   })
//
//   return Picture.findOne({ userId, profile: true })
// }

const getAll = (id) => {
  return postgreSql.connect(config.DATABASE)
  .then((client) => {
    return postgreSql.selectWhere(client, '*', 'pictures', `userId='${id}'`)
    .then((pictures) => {
      postgreSql.end(client)

      if (pictures.rows.length === 0) return Promise.resolve(null)
      return Promise.resolve(pictures.rows)
    })
  })
}

//
// const getNoProfile = (userId) => {
//   return Picture.find({ userId, profile: false })
// }
//
// const remove = (_id) => {
//   return Picture.remove({ _id })
// }
//
// const countWithoutProfile = (userId) => {
//   return Picture.count({ userId, profile: false })
// }
//
module.exports = {
  getAll
  // getProfileByUserId
//   create,
//   countWithoutProfile,
//   getProfile,
//   update,
//   remove,
//   getNoProfile
}
