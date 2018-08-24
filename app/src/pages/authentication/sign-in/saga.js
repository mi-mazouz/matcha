import { takeLatest, call, put } from 'redux-saga/effects'

import { httpClient, history } from '../../../config'
import { setToken } from '../../../utils'
import { SIGNIN_FORM_SUBMIT, SIGNIN_FORM_ERROR } from './constants'

export function* signInFormSubmit() {
  return yield takeLatest([SIGNIN_FORM_SUBMIT], function*({ payload }) {
    try {
      const { data } = yield call(httpClient, {
        method: 'POST',
        url: '/authentication/sign-in',
        data: { ...payload.values }
      })

      yield call(setToken, data.token)
      yield call(history.push, '/dashboard')
    } catch (error) {
      return yield put({ type: SIGNIN_FORM_ERROR, payload: { error: error.response.data.message } })
    }

    return yield payload.resolve()
  })
}
