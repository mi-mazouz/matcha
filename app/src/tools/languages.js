import i18next from 'i18next'

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
    .toUpperCase()
}

export { getLanguage }
