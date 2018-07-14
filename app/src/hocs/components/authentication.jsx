import React from 'react'
import history from '../../config/history'
import { getToken } from '../../utils'

export default (WrappedComponent) => {
  class isAuthenticated extends React.Component {
    render () {
      const token = getToken()
      if (!token) {
        history.push('/')
        return null
      }

      return <WrappedComponent {...this.props} />
    }
  }

  return isAuthenticated
}
