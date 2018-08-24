import axios from 'axios'

import { getToken, logout } from '../utils'
import constants from './constants'
import errors from './errors'

const initInterceptorRequest = client => {
  client.interceptors.request.use(config => {
    const token = getToken()

    if (token) {
      config.headers['authorization'] = 'Bearer ' + token
    }

    return config
  })

  client.interceptors.response.use(null, error => {
    if (error.response && error.response.data) {
      if (error.response.data.message && error.response.data.message === 'TOKEN_INVALID') logout()
      else if (error.response.data.message)
        error.response.data.message = errors[error.response.data.message] || 'An error occured'
    }

    return Promise.reject(error)
  })

  return client
}

export const httpClient = initInterceptorRequest(
  axios.create({ baseURL: constants.HTTP_API_BASE_URI })
)
