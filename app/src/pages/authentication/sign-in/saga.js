import { call, put } from 'redux-saga/effects'

import { httpClient, history } from '../../../config'
import { setToken } from '../../../tools/token'
import { SIGNIN_FORM_ERROR } from './constants'

export function* signInFormSubmit({ payload }) {
  try {
    const { data } = yield call(httpClient, {
      method: 'POST',
      url: '/authentication/sign-in',
      data: { ...payload.values }
    })

    yield call(setToken, data)
    yield call(history.push, '/profile')
  } catch (error) {
    return yield put({ type: SIGNIN_FORM_ERROR, payload: { error: error.response.data.message } })
  }

  return yield payload.resolve()
}
