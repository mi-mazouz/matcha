import React from 'react'

import { Container } from '../../styles/components/containers'

export default (WrappedComponent) => {
  class Menu extends React.Component {
    render () {
      return (
        <Container>
          <WrappedComponent />
        </Container>
      )
    }
  }

  return Menu
}
