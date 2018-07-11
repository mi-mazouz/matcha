import history from './config/history'

const logout = () => {
  delete window.localStorage.token
  history.push('/')
}

const getToken = () => {
  return window.localStorage.token
}

const setToken = (token) => {
  window.localStorage.token = token
}

export {
  logout,
  getToken,
  setToken
}
