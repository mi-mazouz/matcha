import { call, put, takeLatest } from 'redux-saga/effects'
import { history, httpClient } from '../../../config'
import { setToken } from '../../../tools/token'
import { SIGNUP_FORM_ERROR, SIGNUP_FORM_SUBMIT } from './constants'

export function* signUpFormSubmit() {
  return yield takeLatest([SIGNUP_FORM_SUBMIT], function*({ payload }) {
    try {
      const { data } = yield call(httpClient, {
        method: 'POST',
        url: '/authentication/sign-up',
        data: { ...payload.values }
      })

      yield call(setToken, data.token)
      yield call(history.push, '/profile/self')
    } catch (error) {
      return yield put({ type: SIGNUP_FORM_ERROR, payload: { error: error.response.data.message } })
    }

    return yield payload.resolve()
  })
}
