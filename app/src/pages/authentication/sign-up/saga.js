import { takeLatest } from 'redux-saga/effects'

import { SIGNUP_PAGE_FORM_SUBMIT } from './constants'

export function* signUpPageFormSubmit() {
  return yield takeLatest(
    [SIGNUP_PAGE_FORM_SUBMIT],
    function* ({ payload }) {
      console.log(payload.values)
      yield payload.resolve()
    }
  )
}