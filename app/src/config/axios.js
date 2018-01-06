import axios from 'axios'

const initInterceptorRequest = axios.interceptors.request.use((config) => {
  const token = window.localStorage.token

  if (token) {
    config.headers['authorization'] = token
  }

  return config
})

export {
 initInterceptorRequest
}
