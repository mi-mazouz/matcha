import { takeLatest } from 'redux-saga/effects'

import { SIGNIN_PAGE_FORM_SUBMIT } from './constants'

export function* signInPageFormSubmit() {
  return yield takeLatest(
    [SIGNIN_PAGE_FORM_SUBMIT],
    function* ({ payload }) {
      console.log(payload.values)
      yield payload.resolve()
    }
  )
}