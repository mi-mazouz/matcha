const PictureModel = require('../../../database/models').Picture

const Query = {
  getPictures: (_, { id }) => {
    if (id) return null

    return {
      pictures: null
    }
  }
}

const Pictures = {
  profilePicture: (_, { userId }, { userAuthenticated }) => {
    if (userId) return null

    return PictureModel.findOne({ where: { userId: userAuthenticated.id, isProfile: true } })
    .then(
      profilePicture => {
        if (!profilePicture) return null
        return {
          path: profilePicture.path
        }
      }
    )
  }
}

exports.resolver = {
  Query,
  Pictures
}
