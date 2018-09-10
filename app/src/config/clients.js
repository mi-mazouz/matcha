import axios from 'axios'
import jwt from 'jsonwebtoken'
import { ApolloClient, ApolloLink, Observable, HttpLink, InMemoryCache } from 'apollo-boost'
import { onError } from 'apollo-link-error'

import { getToken, setToken } from '../tools/token'
import getErrorTranslateKey from './errors'
import { config } from '../config'

const authLink = new ApolloLink((operation, forward) => {
  return new Observable(observable => {
    const token = getToken()

    if (token) {
      const decodedToken = jwt.decode(token)

      if (Math.floor(Date.now() / 1000) + 60 - decodedToken.exp >= 60) {
        return httpClient
          .get('/authentication/refresh-token')
          .then(response => {
            setToken(response.data.token)
            operation.setContext({
              headers: { authorization: 'Bearer ' + response.data.token }
            })

            return forward(operation)
              .subscribe(observable)
          })
          .catch(error => {
            observable.error({ result: { message: error.response.data.message } })
          })
      } else {
        operation.setContext({
          headers: { authorization: 'Bearer ' + token }
        })
      }
    }

    return forward(operation)
      .subscribe(observable)
  })
})

const afterLink = onError(({ networkError }) => {
  if (networkError && networkError.result) {
    if (networkError.result.errors && networkError.result.errors.length > 0) {
      networkError.result.message = getErrorTranslateKey(networkError.result.errors[0].message)
    } else if (networkError.result.message) {
      networkError.result.message = getErrorTranslateKey(networkError.result.message)
    }
  }
})

export const graphqlClient = new ApolloClient({
  link: ApolloLink.from([authLink, afterLink, new HttpLink({ uri: config.GRAPHQL_API_BASE_URI })]),
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
  axios.create({ baseURL: config.HTTP_API_BASE_URI })
)
