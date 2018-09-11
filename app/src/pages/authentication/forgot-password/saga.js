import { call, put, takeLatest } from 'redux-saga/effects'
import { history, httpClient } from '../../../config'
import { setToken } from '../../../tools/token'
import { FORGOT_PASSWORD_FORM_ERROR, FORGOT_PASSWORD_FORM_SUBMIT } from './constants'

export function* forgotPasswordFormSubmit() {
  return yield takeLatest([FORGOT_PASSWORD_FORM_SUBMIT], function*({ payload }) {
    try {
      const { data } = yield call(httpClient, {
        method: 'POST',
        url: '/authentication/forgot-password',
        data: { ...payload.values }
      })

      yield call(setToken, data.token)
      yield call(history.push, '/dashboard')
    } catch (error) {
      return yield put({
        type: FORGOT_PASSWORD_FORM_ERROR,
        payload: { error: error.response.data.message }
      })
    }

    return yield payload.resolve()
  })
}
