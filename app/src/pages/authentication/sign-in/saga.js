import { takeLatest, call, put } from 'redux-saga/effects'

import { httpClient } from '../../../config/clients'
import {
  SIGNIN_FORM_SUBMIT,
  SIGNIN_FORM_ERROR
} from './constants'

export function* signInFormSubmit() {
  return yield takeLatest(
    [SIGNIN_FORM_SUBMIT],
    function* ({ payload }) {
      try {
        const { data } = yield call(httpClient, {
          method: 'POST',
          url: '/authentication/sign-in',
          data: { ...payload.values}
        })

        console.log(data)
      } catch (error) {
        document.getElementsByName('email')[0].blur()
        document.getElementsByName('password')[0].blur()
        yield put({ type: SIGNIN_FORM_ERROR, payload: { error: error.response.data.message } })
      }

      return yield payload.resolve()
    }
  )
}