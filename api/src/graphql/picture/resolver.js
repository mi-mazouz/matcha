const PictureModel = require('../../../database/models').Picture

const Query = {
  getPictures: (_, { userId }, { userAuthenticated }) => {
    return PictureModel.findAll({
      where: { userId: userId || userAuthenticated.id }
    })
    .then(pictures => {
      if (pictures.length === 0) return { pictures: null, profilePicture: null }

      return {
        pictures: pictures
        .filter(picture => !picture.isProfile)
        .map(picture => ({ path: picture.path })),
        profilePicture: { path: pictures.find(picture => picture.isProfile).path }
      }
    })
  }
}

exports.resolver = {
  Query
}
