import axios from 'axios'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'

import { getToken } from '../utils'
import constants from './constants'
import errors from './errors'

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken()

  if (token) {
    operation.setContext({
      headers: { authorization: 'Bearer ' + token }
    })
  }

  return forward(operation)
})

export const graphqlClient = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: constants.GRAPHQL_API_BASE_URI })]),
  cache: new InMemoryCache()
})

const initInterceptorRequest = client => {
  client.interceptors.request.use(config => {
    const token = getToken()

    if (token) {
      config.headers['authorization'] = 'Bearer ' + token
    }

    return config
  })

  client.interceptors.response.use(null, error => {
    if (error.response && error.response.data && error.response.data.message) {
      error.response.data.message = errors[error.response.data.message] || 'An error occured'
    }

    return Promise.reject(error)
  })

  return client
}

export const httpClient = initInterceptorRequest(
  axios.create({ baseURL: constants.HTTP_API_BASE_URI })
)
