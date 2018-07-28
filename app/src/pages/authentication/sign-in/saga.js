import { takeLatest, call } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'

import { httpClient } from '../../../config/clients'
import { SIGNIN_FORM_SUBMIT } from './constants'

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
        return yield payload.reject(new SubmissionError({email: error.response.data.message }))
        // handle much better the error
      }

      return yield payload.resolve()
    }
  )
}