import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

export default i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: ['i18next'],
    defaultNS: 'i18next',
    backend: {
      loadPath: '/locales/i18next/{{ns}}.{{lng}}.json'
    }
  })
