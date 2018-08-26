import { call, put, takeLatest } from 'redux-saga/effects'
// import { translate } from 'react-i18next'

import { history, graphqlClient } from '../../config'
import { logout } from '../../utils'
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from './constants'
import { ADD_NOTIFICATION } from '../../global/components/notification/constants'
import { userProfileQuery } from './queries'

export function* fetchUser() {
  return yield takeLatest([FETCH_USER_REQUEST], function*() {
    try {
      const { data } = yield call(graphqlClient.query, {
        query: userProfileQuery,
        fetchPolicy: 'no-cache'
      })
      console.log(data)

      return yield put({
        type: FETCH_USER_SUCCESS,
        payload: data
      })
    } catch (error) {
      yield call(logout)
      yield call(history.push, '/login')

      return yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          // message: translate('error.response.data.message'),
          message: 'An error occured, please try to sign in again',
          level: 'error',
          position: 'tr',
          autoDismiss: 5
        }
      })
    }
  })
}
