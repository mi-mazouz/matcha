import history from '../config/history'

const logout = () => {
  delete window.localStorage.token
  history.push('/')
}

const isName = name => {
  const regex = /^([a-zA-Z]{2,50})$/

  return regex.test(name)
}

const isEmail = email => {
  const regex = /^(([a-zA-Z0-9._-]{1,32})@([a-z]{2,16}).([a-z.0-9]{2,16}))$/

  return regex.test(email)
}

const isUsername = username => {
  const regex = /^([a-zA-Z0-9-_]{4,16})$/

  return regex.test(username)
}

const isPassword = password => {
  const regex = /^(?=.{8,64})(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*$/

  return regex.test(password)
}

const getGenderIcon = gender => {
  switch (gender) {
    case 'MAN':
      return 'mars'
    case 'WOMAN':
      return 'venus'
    default:
      return 'transgender'
  }
}

export { isPassword, isUsername, isEmail, isName, logout, getGenderIcon }
