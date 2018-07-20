import { takeLatest } from 'redux-saga/effects'

import { SIGNIN_FORM_SUBMIT } from './constants'

export function* signInFormSubmit() {
  return yield takeLatest(
    [SIGNIN_FORM_SUBMIT],
    function* ({ payload }) {
      console.log(payload.values)
      yield payload.resolve()
    }
  )
}