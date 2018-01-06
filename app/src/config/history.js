import createHistory from 'history/createHashHistory'
import 'url-search-params-polyfill'

export const URLSearchParams = window.URLSearchParams

export default createHistory()
