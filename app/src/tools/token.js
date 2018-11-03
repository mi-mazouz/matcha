import { decode } from 'jsonwebtoken'

const getToken = () => window.localStorage.token

const setToken = token => {
  window.localStorage.token = token
}

const isAlmostExpired = token => {
  const decodedToken = decode(token)

  return Math.floor(Date.now() / 1000) + 60 * 60 - decodedToken.exp >= 3000
}

export { getToken, setToken, isAlmostExpired }
