const { ApolloError } = require('apollo-server-express')

const errors = require('../config/errors')
const UserModel = require('../../database/models').User

module.exports = ({ req }) => {
  if (!req.user || !req.user.id)
    throw new ApolloError(errors.BAD_TOKEN, 401, { path: '/graphql', locations: 'getUser' })

  return UserModel.findById(req.user.id)
  .then(user => {
    if (!user)
      throw new ApolloError(errors.CURRENT_USER_NOT_FOUND, 401, {
        path: '/graphql',
        locations: 'getUser'
      })

    return { userAuthenticated: { ...user.dataValues, language: req.user.language } }
  })
}
