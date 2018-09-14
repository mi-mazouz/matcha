import React from 'react'
import { call, put, takeLatest } from 'redux-saga/effects'
import { matchPath } from 'react-router-dom'

import { i18n, httpClient, history, muiTheme } from '../../../config'
import { RESET_PASSWORD_FORM_SUBMIT, RESEND_RESET_PASSWORD_EMAIL } from './constants'
import { ADD_NOTIFICATION } from '../../../global/components/notification/constants'
import Button from '../../../global/components/Button'
import store from '../../../store'

export function* resetPasswordFormSubmit() {
  return yield takeLatest([RESET_PASSWORD_FORM_SUBMIT], function*({ payload }) {
    try {
      yield call(httpClient, {
        method: 'PATCH',
        url: `/authentication/reset-password?token=${payload.token}`,
        data: { ...payload.values }
      })
      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: i18n.t('notifications.success.successfully_sent'),
          level: 'success',
          position: 'tr',
          autoDismiss: 5
        }
      })

      return yield payload.resolve()
    } catch (error) {
      const match = yield matchPath(history.location.pathname, {
        path: '/reset-password/:token',
        exact: true
      })

      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: i18n.t(`notifications.error.${error.response.data.message}`),
          children: (
            <Button
              onClick={() =>
                store.dispatch({
                  type: RESEND_RESET_PASSWORD_EMAIL,
                  payload: { token: match.params.token }
                })
              }
              isSmall
              backgroundColor={muiTheme.palette.red}
            >
              {i18n.t('send_again')}
            </Button>
          ),
          level: 'error',
          position: 'tr',
          autoDismiss: 0
        }
      })
    }

    return yield payload.resolve()
  })
}

export function* resendResetPasswordEmail() {
  return yield takeLatest([RESEND_RESET_PASSWORD_EMAIL], function*({ payload }) {
    try {
      yield call(httpClient, {
        method: 'POST',
        url: `/authentication/resend-reset-password-email?token=${payload.token}`
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
  })
}
