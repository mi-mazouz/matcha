import React from 'react'
import { Redirect } from 'react-router-dom'

import { getToken } from '../../tools/token'

export default WrappedComponent => {
  class IsLogged extends React.Component {
    render() {
      console.log(1)
      const token = getToken()

      if (!token) return <Redirect to="/" />

      return <WrappedComponent {...this.props} />
    }
  }

  return IsLogged
}
