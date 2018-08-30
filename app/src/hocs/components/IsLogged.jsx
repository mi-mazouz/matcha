import React from 'react'
import { Redirect } from 'react-router-dom'

import { getToken } from '../../tools'

export default WrappedComponent => {
  class IsLogged extends React.Component {
    render() {
      const token = getToken()

      if (!token) return <Redirect to="/" />

      return <WrappedComponent {...this.props} />
    }
  }

  return IsLogged
}
