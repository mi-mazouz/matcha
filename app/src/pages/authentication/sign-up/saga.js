import { takeLatest } from 'redux-saga/effects'

import { SIGNUP_FORM_SUBMIT } from './constants'

export function* signUpFormSubmit() {
  return yield takeLatest(
    [SIGNUP_FORM_SUBMIT],
    function* ({ payload }) {
      console.log(payload.values)
      yield payload.resolve()
    }
  )
}