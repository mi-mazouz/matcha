import axios from 'axios'

import { getToken, logout } from '../utils'
import constants from './constants'

const initInterceptorRequest = () => {
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
}

export const restClient = initInterceptorRequest(axios.create({ baseURL: constants.HTTP_API_BASE_URI }))
