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

const isEmail = (email) => {
  const regex = /^(([a-zA-Z0-9._-]{1,32})@([a-z]{2,16}).([a-z.0-9]{2,16}))$/

  return regex.test(email)
}

export {
  logout,
  getToken,
  setToken,
  isEmail
}
