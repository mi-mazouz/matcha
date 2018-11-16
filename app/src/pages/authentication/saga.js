import { takeLatest } from 'redux-saga/effects'

import { SIGNUP_FORM_SUBMIT } from './sign-up/constants'
import { signUpFormSubmit } from './sign-up/saga'
import { SIGNIN_FORM_SUBMIT } from './sign-in/constants'
import { signInFormSubmit } from './sign-in/saga'
import { RESET_PASSWORD_FORM_SUBMIT, RESEND_RESET_PASSWORD_EMAIL } from './reset-password/constants'
import { resetPasswordFormSubmit, resendResetPasswordEmail } from './reset-password/saga'
import { FORGOT_PASSWORD_FORM_SUBMIT } from './forgot-password/constants'
import { forgotPasswordFormSubmit } from './forgot-password/saga'
import { RESEND_CONFIRM_EMAIL } from './comfirm-email/constants'
import { resendConfirmEmail } from './comfirm-email/saga'

export default function* authenticationWatcher() {
  yield takeLatest([SIGNUP_FORM_SUBMIT], signUpFormSubmit)
  yield takeLatest([SIGNIN_FORM_SUBMIT], signInFormSubmit)
  yield takeLatest([RESET_PASSWORD_FORM_SUBMIT], resetPasswordFormSubmit)
  yield takeLatest([RESEND_RESET_PASSWORD_EMAIL], resendResetPasswordEmail)
  yield takeLatest([FORGOT_PASSWORD_FORM_SUBMIT], forgotPasswordFormSubmit)
  return yield takeLatest([RESEND_CONFIRM_EMAIL], resendConfirmEmail)
}
