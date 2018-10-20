import axios from 'axios'
import jwt from 'jsonwebtoken'
import { ApolloClient, ApolloLink, Observable, HttpLink, InMemoryCache } from 'apollo-boost'
import { onError } from 'apollo-link-error'

import { getToken, setToken } from '../tools/token'
import { config, i18n } from '../config'
import { logout } from '../tools'
import { getLanguage } from '../tools/languages'
import { errors } from './errors'
import { ADD_NOTIFICATION } from '../global/components/notification/constants'
import store from '../store'
import getErrorTranslateKey from './errors'

const authLink = new ApolloLink((operation, forward) => {
  return new Observable(observable => {
    const token = getToken()
    const headers = {}

    headers['language'] = getLanguage()
    if (token) {
      const decodedToken = jwt.decode(token)

      if (Math.floor(Date.now() / 1000) + 60 * 60 - decodedToken.exp >= 2000) {
        return httpClient
          .get('/authentication/refresh-token')
          .then(response => {
            setToken(response.data.token)
            operation.setContext({
              headers: { ...headers, authorization: 'Bearer ' + response.data.token }
            })

            return forward(operation)
              .subscribe(observable)
          })
          .catch(error => {
            if (error.response.data.message === errors.USER_INACTIVE) {
              logout()
              store.dispatch({
                type: ADD_NOTIFICATION,
                payload: {
                  title: 'Notification',
                  message: i18n.t(getErrorTranslateKey(error.response.data.message)),
                  level: 'error',
                  position: 'tr',
                  autoDismiss: 5
                }
              })

              return observable.error(null)
            } else return observable.error({ result: { message: error.response.data.message } })
          })
      }

      operation.setContext({
        headers: { ...headers, authorization: 'Bearer ' + token }
      })
    }

    return forward(operation)
      .subscribe(observable)
  })
})

const afterLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError && networkError.result) {
    if (networkError.result.errors && networkError.result.errors.length > 0) {
      networkError.result.message = getErrorTranslateKey(networkError.result.errors[0].message)
    } else if (networkError.result.message) {
      networkError.result.message = getErrorTranslateKey(networkError.result.message)
    }
  }
  if (graphQLErrors.length > 0)
    graphQLErrors.push({ message: getErrorTranslateKey(graphQLErrors[0].message) })
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
    config.headers['language'] = getLanguage()

    return config
  })

  client.interceptors.response.use(null, error => {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message !== errors.USER_INACTIVE) {
        error.response.data.message = getErrorTranslateKey(error.response.data.message)
      }
    }

    return Promise.reject(error)
  })

  return client
}

export const httpClient = initInterceptorRequest(
  axios.create({ baseURL: config.HTTP_API_BASE_URI })
)
