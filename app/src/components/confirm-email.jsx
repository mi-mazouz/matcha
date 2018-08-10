import React from 'react'

import Spinner from '../common/components/Spinner.js'
import { httpClient, history } from '../config'
import { setToken } from '../utils'

class ConfirmEmail extends React.Component {
  async componentDidMount () {
    try {
      const { data } = await httpClient({
        method: 'PUT',
        url: `/authentication/confirm-email/${this.props.match.params.token}`
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

export default ConfirmEmail