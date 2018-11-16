import { takeLatest, call, put } from 'redux-saga/effects'

import { httpClient, i18n } from '../../config'
import { GET_CURRENT_USER_REQUEST, GET_CURRENT_USER_SUCCESS } from './constants'
import { ADD_NOTIFICATION } from '../../global/components/notification/constants'

export function* getCurrentUser() {
  return yield takeLatest([GET_CURRENT_USER_REQUEST], function*() {
    try {
      const { data } = yield call(httpClient, {
        method: 'GET',
        url: '/user/me'
      })

      return yield put({ type: GET_CURRENT_USER_SUCCESS, payload: data })
    } catch (error) {
      return yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: i18n.t(error.response.data.message),
          level: 'error',
          position: 'tr',
          autoDismiss: 5
        }
      })
    }
  })
}
