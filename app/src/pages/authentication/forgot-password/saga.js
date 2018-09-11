import { call, put, takeLatest } from 'redux-saga/effects'
import { i18n, httpClient } from '../../../config'
import { FORGOT_PASSWORD_FORM_ERROR, FORGOT_PASSWORD_FORM_SUBMIT } from './constants'
import { ADD_NOTIFICATION } from '../../../global/components/notification/constants'

export function* forgotPasswordFormSubmit() {
  return yield takeLatest([FORGOT_PASSWORD_FORM_SUBMIT], function*({ payload }) {
    try {
      yield call(httpClient, {
        method: 'POST',
        url: '/authentication/forgot-password',
        data: { ...payload.values }
      })
      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: i18n.t('notifications.success.forgot_password_email'),
          level: 'success',
          position: 'tr',
          autoDismiss: 5
        }
      })

      return yield payload.resolve()
    } catch (error) {
      yield put({
        type: FORGOT_PASSWORD_FORM_ERROR,
        payload: { error: error.response.data.message }
      })
    }

    return yield payload.resolve()
  })
}
