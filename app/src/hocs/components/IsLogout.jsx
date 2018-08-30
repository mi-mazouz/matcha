import React from 'react'
import { Redirect } from 'react-router-dom'

import { getToken } from '../../tools'

export default WrappedComponent => {
  class IsLogout extends React.Component {
    render() {
      const token = getToken()

      if (!token) return <WrappedComponent {...this.props} />

      return <Redirect to="/dashboard/profile" />
    }
  }

  return IsLogout
}
