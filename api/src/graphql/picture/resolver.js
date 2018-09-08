const PictureModel = require('../../../database/models').Picture

const Query = {
  getPictures: (_, { userId }, { userAuthenticated }) => {
    return PictureModel.findAll({
      where: { userId: userId || userAuthenticated.id, isProfile: false }
    })
    .then(pictures => {
      if (!pictures) return null

      return {
        pictures: pictures.map(picture => ({ path: picture.path }))
      }
    })
  }
}

const Pictures = {
  profilePicture: (_, { userId }, { userAuthenticated }) => {
    return PictureModel.findOne({
      where: { userId: userId || userAuthenticated.id, isProfile: true }
    })
    .then(profilePicture => {
      if (!profilePicture) return null

      return {
        path: profilePicture.path
      }
    })
  }
}

exports.resolver = {
  Query,
  Pictures
}
