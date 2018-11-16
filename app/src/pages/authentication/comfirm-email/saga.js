import { call, put } from 'redux-saga/effects'

import { httpClient, i18n } from '../../../config'
import { ADD_NOTIFICATION } from '../../../global/components/notification/constants'

export function* resendConfirmEmail({ payload }) {
  try {
    yield call(httpClient, {
      method: 'POST',
      url: `/authentication/resend-confirm-email?token=${payload.token}`
    })

    return yield put({
      type: ADD_NOTIFICATION,
      payload: {
        title: 'Notification',
        message: i18n.t('notifications.success.successfully_sent'),
        level: 'success',
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
}
