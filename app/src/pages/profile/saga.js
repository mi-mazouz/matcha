import { call, put, takeLatest } from 'redux-saga/effects'

import { httpClient, i18n } from '../../config'
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from './constants'
import { ADD_NOTIFICATION } from '../../global/components/notification/constants'

export function* fetchUser() {
  return yield takeLatest([FETCH_USER_REQUEST], function*({ payload }) {
    try {
      const { data } = yield call(httpClient, {
        method: 'GET',
        url: '/user/get-profile',
        data: { userId: (payload && payload.userId) || null }
      })

      return yield put({
        type: FETCH_USER_SUCCESS,
        payload: data
      })
    } catch (error) {
      yield put({
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
