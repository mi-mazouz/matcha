import axios from 'axios'

import { getToken, logout } from '../utils'
import constants from './constants'

const initInterceptorRequest = (client) => {
  axios.interceptors.request.use((config) => {
    const token = getToken()

    if (token) {
      config.headers['authorization'] = token
    }

    return config
  })

  axios.interceptors.response.use(null, (error) => {
    if (error.response && error.response.status === 401 && error.response.data.message === 'TOKEN_INVALID') {
      logout()
    }

    return Promise.reject(error)
  })

  return client
}

export const httpClient = initInterceptorRequest(axios.create({ baseURL: constants.HTTP_API_BASE_URI }))
