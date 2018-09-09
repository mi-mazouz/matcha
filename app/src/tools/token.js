const getToken = () => window.localStorage.token

const setToken = token => {
  window.localStorage.token = token
}

export { getToken, setToken }
