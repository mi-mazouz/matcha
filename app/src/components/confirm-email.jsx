import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '../common/components/Spinner.js'
import { httpClient, history } from '../config'
import { setToken } from '../utils'

class ConfirmEmail extends React.Component {
  async componentDidMount () {
    const { match } = this.props

    try {
      const { data } = await httpClient({
        method: 'PUT',
        url: `/authentication/confirm-email?token=${match.params.token}`
      })
    
      await setToken(data.token)
      history.push('/dashboard/profile')
    } catch(error) {
      history.push('/')
    }
    
  }

  render () {
    return <Spinner />
  }
}

ConfirmEmail.propTypes = {
  match: PropTypes.object.isRequired
}

export default ConfirmEmail