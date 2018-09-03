import axios from 'axios'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'
import { onError } from 'apollo-link-error'

import { getToken } from '../utils'
import constants from './constants'
import getErrorTranslateKey from './errors'

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken()

  if (token) {
    operation.setContext({
      headers: { authorization: 'Bearer ' + token }
    })
  }

  return forward(operation)
})

const afterLink = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.result &&
    networkError.result.errors &&
    networkError.result.errors.length > 0
  ) {
    networkError.result.message = getErrorTranslateKey(networkError.result.errors[0].message)
  }
})

export const graphqlClient = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    afterLink,
    new HttpLink({ uri: constants.GRAPHQL_API_BASE_URI })
  ]),
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
      error.response.data.message = getErrorTranslateKey(error.response.data.message)
    }

    return Promise.reject(error)
  })

  return client
}

export const httpClient = initInterceptorRequest(
  axios.create({ baseURL: constants.HTTP_API_BASE_URI })
)
