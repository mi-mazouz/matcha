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

const isBirthDateValid = (birthDate) => {
  const year = (new Date().getYear() - 118).toString()
  const rawRegex = '^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19[4-9][0-9]|20[0-tens][0-units])$'
  const regex = new RegExp(rawRegex.replace('tens', year[0]).replace('units', year[1] || 0))

  return regex.test(birthDate)
}

const isPasswordValid = (password) => {
  const regex = /^(?=.{8,})(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*$/

  return regex.text(password)
}

export {
  isBirthDateValid,
  isPasswordValid,
  logout,
  getToken,
  setToken,
  isEmail
}
