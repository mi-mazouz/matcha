const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const PictureModel = require('../../../database/models').Picture

const Birthdate = new GraphQLScalarType({
  name: 'Date',
  description: 'Birthdate format.',
  parseValue(value) {
    return new Date(value) // value from the client
  },
  serialize(value) {
    return value.getTime() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value) // ast value is always in string format
    }
    return null
  }
})

const Query = {
  getUser: (_, { id }, { userAuthenticated }) => {
    if (id) return null
    return {
      birthDate: userAuthenticated.birthDate,
      email: userAuthenticated.email,
      firstName: userAuthenticated.firstName,
      lastName: userAuthenticated.lastName,
      username: userAuthenticated.username,
      gender: userAuthenticated.gender,
      sexualOrientation: userAuthenticated.sexualOrientation
    }
  }
}

const User = {
  profilePicture: (_, { id }, { userAuthenticated }) => {
    if (id) return null

    return PictureModel.findOne({ where: { userId: userAuthenticated.id, isProfile: true } })
    .then(
      picture => ({
        path: picture.path
      })
    )
  }
}

exports.resolver = {
  Query,
  User,
  Birthdate
}
