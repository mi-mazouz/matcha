import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Spinner from '../../common/components/Spinner.js'
import { httpClient, history } from '../../config'
import { setToken } from '../../utils'
import { ADD_NOTIFICATION } from '../constants'

class ConfirmEmail extends React.Component {
  async componentDidMount () {
    const { match } = this.props

    try {
      const { data } = await httpClient({
        method: 'PUT',
        url: `/authentication/confirm-email?token=${match.params.token}`
      })
    
      await setToken(data.token)
      await this.props.dispatch({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: this.props.t('notifications.success.confirmation_email'),
          level: 'success',
          position: 'tr',
          autoDismiss: 5
        }
      })
      history.push('/dashboard/profile')
    } catch(error) {
      await this.props.dispatch({
        type: ADD_NOTIFICATION,
        payload: {
          title: 'Notification',
          message: this.props.t(`notifications.error.confirmation_email.${error.response.data.message}`),
          level: 'error',
          position: 'tr',
          autoDismiss: 0
        }
      })
      history.push('/')
    } 
  }

  render () {
    return <Spinner />
  }
}

ConfirmEmail.propTypes = {
  t: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(translate()(ConfirmEmail))