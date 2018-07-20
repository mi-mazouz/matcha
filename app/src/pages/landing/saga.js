import { takeLatest } from 'redux-saga/effects'

import { LANDING_PAGE_FORM_SUBMIT } from './constants'

export function* landingPageFormSubmit() {
  return yield takeLatest(
    [LANDING_PAGE_FORM_SUBMIT],
    function* ({ payload }) {
      yield payload.resolve()
    }
  )
}