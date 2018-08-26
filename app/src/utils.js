import i18next from 'i18next'

import history from './config/history'

const getLanguage = () => {
  const language =
    i18next.language ||
    window.localStorage.i18nextLng ||
    navigator.language ||
    navigator.userLanguage ||
    'en'

  return language
    .split('-')[0]
    .split('_')[0]
    .toLowerCase()
}

const logout = () => {
  delete window.localStorage.token
  history.push('/')
}

const getToken = () => {
  return window.localStorage.token
}

const setToken = token => {
  window.localStorage.token = token
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

const isBirthDate = birthDate => {
  const year = (new Date()
    .getYear() - 118).toString()
  const rawRegex =
    '^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19[4-9][0-9]|20[0-tens][0-units])$'
  const regex = new RegExp(rawRegex.replace('tens', year[0])
    .replace('units', year[1] || 0))

  if (getLanguage() === 'fr') {
    const frenchBirthDate = birthDate.match(/\d+/g)
    if (!frenchBirthDate) return false

    const month = frenchBirthDate[1]

    frenchBirthDate[1] = frenchBirthDate[0]
    frenchBirthDate[0] = month

    return regex.test(frenchBirthDate.join('/'))
  }

  return regex.test(birthDate)
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

export {
  isBirthDate,
  isPassword,
  isUsername,
  isEmail,
  isName,
  logout,
  getToken,
  getGenderIcon,
  setToken
}
