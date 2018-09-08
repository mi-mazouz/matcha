import { call, put, takeLatest } from 'redux-saga/effects'

import { history, graphqlClient, i18n } from '../../config'
import { logout } from '../../utils'
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from './constants'
import { ADD_NOTIFICATION } from '../../global/components/notification/constants'
import { fetchUserProfile } from './queries'

export function* fetchUser() {
  return yield takeLatest([FETCH_USER_REQUEST], function*() {
    try {
      const { data } = yield call(graphqlClient.query, {
        query: fetchUserProfile,
        fetchPolicy: 'cache-first'
      })

      return yield put({
        type: FETCH_USER_SUCCESS,
        payload: { ...data.getUser, ...data.getPictures }
      })
    } catch (error) {
      yield call(logout)
      yield call(history.push, '/login')
      return yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: i18n.t(error.networkError.result.message),
          level: 'error',
          position: 'tr',
          autoDismiss: 5
        }
      })
    }
  })
}
