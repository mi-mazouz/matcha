import { call, put } from 'redux-saga/effects'

import { history, httpClient } from '../../../config'
import { setToken } from '../../../tools/token'
import { SIGNUP_FORM_ERROR } from './constants'

export function* signUpFormSubmit({ payload }) {
  try {
    const { data } = yield call(httpClient, {
      method: 'POST',
      url: '/authentication/sign-up',
      data: { ...payload.values }
    })

    yield call(setToken, data)
    yield call(history.push, '/profile')
  } catch (error) {
    return yield put({ type: SIGNUP_FORM_ERROR, payload: { error: error.response.data.message } })
  }

  return yield payload.resolve()
}
