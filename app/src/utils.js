const logout = () => {
  delete window.localStorage.token
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
