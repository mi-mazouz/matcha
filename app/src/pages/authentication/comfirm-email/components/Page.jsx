import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withTheme } from '@material-ui/core/styles'

import Button from '../../../../global/components/Button'
import Spinner from '../../../../global/components/Spinner.js'
import { httpClient, history } from '../../../../config'
import { setToken } from '../../../../tools/token'
import { RESEND_CONFIRM_EMAIL } from '../constants'
import { ADD_NOTIFICATION } from '../../../../global/components/notification/constants'

class ConfirmEmail extends React.Component {
  async componentDidMount() {
    const { match, t, theme, dispatch } = this.props

    try {
      const { data } = await httpClient({
        method: 'PATCH',
        url: `/authentication/confirm-email?token=${match.params.token}`
      })

      await setToken(data.token)
      await dispatch({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: t('notifications.success.successfully_sent'),
          level: 'success',
          position: 'tr',
          autoDismiss: 5
        }
      })
      history.push('/dashboard/profile')
    } catch (error) {
      await dispatch({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: t(`notifications.error.${error.response.data.message}`),
          children: (
            <Button
              onClick={() =>
                dispatch({
                  type: RESEND_CONFIRM_EMAIL,
                  payload: { token: match.params.token }
                })
              }
              isSmall
              backgroundColor={theme.palette.red}
            >
              {t('send_again')}
            </Button>
          ),
          level: 'error',
          position: 'tr',
          autoDismiss: 0
        }
      })
      history.push('/')
    }
  }

  render() {
    return <Spinner />
  }
}

ConfirmEmail.propTypes = {
  t: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(translate()(withTheme()(ConfirmEmail)))
