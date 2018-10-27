const { ApolloError } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const errors = require('../../config/errors')
const UserModel = require('../../../database/models').User

const getUserObject = user => ({
  id: user.id,
  birthDate: user.birthDate,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  gender: user.gender,
  sexualOrientation: user.sexualOrientation
})

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
  getUser: (_, { userId }, { userAuthenticated }) => {
    if (userId && parseInt(userId, 10) === userAuthenticated.id)
      throw new ApolloError(errors.FETCH_SAME_USER, 409, {
        path: '/graphql',
        locations: 'getUser'
      })

    if (userId) {
      return UserModel.findById(userId)
      .then(user => {
        if (!user)
          throw new ApolloError(errors.USER_NOT_FOUND, 401, {
            path: '/graphql',
            locations: 'getUser'
          })

        return getUserObject(user)
      })
    }

    return getUserObject(userAuthenticated)
  }
}

exports.resolver = {
  Query,
  Birthdate
}
