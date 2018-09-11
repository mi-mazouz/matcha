import { call, put, takeLatest } from 'redux-saga/effects'
import { i18n, httpClient } from '../../../config'
import { RESET_PASSWORD_FORM_ERROR, RESET_PASSWORD_FORM_SUBMIT } from './constants'
import { ADD_NOTIFICATION } from '../../../global/components/notification/constants'

export function* resetPasswordFormSubmit() {
  return yield takeLatest([RESET_PASSWORD_FORM_SUBMIT], function*({ payload }) {
    try {
      yield call(httpClient, {
        method: 'POST',
        url: `/authentication/reset-password?token=${payload.token}`,
        data: { ...payload.values }
      })
      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: i18n.t('notifications.success.reset_password_email'),
          level: 'success',
          position: 'tr',
          autoDismiss: 5
        }
      })

      return yield payload.resolve()
    } catch (error) {
      yield put({
        type: RESET_PASSWORD_FORM_ERROR,
        payload: { error: error.response.data.message }
      })
    }

    return yield payload.resolve()
  })
}
