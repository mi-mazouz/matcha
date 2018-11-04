import axios from 'axios'

import getErrorTranslateKey from './errors'
import { getToken, setToken, isAlmostExpired } from '../tools/token'
import { config } from '../config'
import { logout } from '../tools'
import { getLanguage } from '../tools/languages'

const initInterceptorRequest = client => {
  client.interceptors.request.use(requestConfig => {
    const token = getToken()
    requestConfig.headers['language'] = getLanguage()

    if (token) {
      requestConfig.headers['authorization'] = 'Bearer ' + token

      if (isAlmostExpired(token)) {
        return axios({
          method: 'GET',
          url: `${config.HTTP_API_BASE_URI}/authentication/refresh-token`,
          headers: { authorization: 'Bearer ' + token }
        })
        .then(response => {
          setToken(response.data.token)
          requestConfig.headers['authorization'] = 'Bearer ' + response.data.token

          return Promise.resolve(requestConfig)
        })
        .catch(error => {
          logout()
          return Promise.reject(error)
        })
      }
    }

    return requestConfig
  })

  client.interceptors.response.use(null, error => {
    if (error.response && error.response.data && error.response.data.message) {
      error.response.data.message = getErrorTranslateKey(error.response.data.message)
    }

    return Promise.reject(error)
  })

  return client
}

const httpClient = initInterceptorRequest(axios.create({ baseURL: config.HTTP_API_BASE_URI }))

export default httpClient
