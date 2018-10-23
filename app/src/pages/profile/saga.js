import { call, put, takeLatest } from 'redux-saga/effects'

import { history, graphqlClient, i18n, errors } from '../../config'
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from './constants'
import { ADD_NOTIFICATION } from '../../global/components/notification/constants'
import { fetchUserProfile } from './queries'
import { logout } from '../../tools'

export function* fetchUser() {
  return yield takeLatest([FETCH_USER_REQUEST], function*({ payload }) {
    try {
      const { data } = yield call(graphqlClient.query, {
        query: fetchUserProfile,
        variables: { userId: (payload && payload.userId) || null },
        fetchPolicy: 'cache-first'
      })

      return yield put({
        type: FETCH_USER_SUCCESS,
        payload: { ...data.getUser, ...data.getPictures }
      })
    } catch (error) {
      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: i18n.t(error.graphQLErrors[1].message),
          level: 'error',
          position: 'tr',
          autoDismiss: 5
        }
      })

      if (error.graphQLErrors[0] === errors.CURRENT_USER_NOT_FOUND) return yield logout()
      else return yield history.push('/profile/self')
    }
  })
}
