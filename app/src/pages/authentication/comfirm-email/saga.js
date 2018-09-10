import { call, put, takeLatest } from 'redux-saga/effects'

import { httpClient, i18n } from '../../../config'
import { RESEND_CONFIRM_EMAIL } from './constants'
import { ADD_NOTIFICATION } from '../../../global/components/notification/constants'

export function* resendConfirmEmail() {
  return yield takeLatest([RESEND_CONFIRM_EMAIL], function*({ payload }) {
    try {
      yield call(httpClient, {
        method: 'POST',
        url: `/authentication/resend-confirm-email?token=${payload.token}`
      })

      return yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: i18n.t('notifications.success.resend_confirmation_email'),
          level: 'success',
          children: null,
          position: 'tr',
          autoDismiss: 5
        }
      })
    } catch (error) {
      return yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: i18n.t(error.response.data.message),
          level: 'error',
          position: 'tr',
          autoDismiss: 5
        }
      })
    }
  })
}
