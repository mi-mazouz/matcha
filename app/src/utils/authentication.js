import React from 'react'
import history from '../config/history'

const isAuthenticated = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount () {
      if (!window.localStorage.token) history.push('/signin')
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}

export {
  isAuthenticated
}
