import React from 'react'
import { Redirect } from 'react-router-dom'

import { getToken } from '../tools/token'

export default WrappedComponent => {
  class IsLogout extends React.Component {
    render() {
      const token = getToken()

      if (!token) return <WrappedComponent {...this.props} />

      return <Redirect to="/profile" />
    }
  }

  return IsLogout
}
