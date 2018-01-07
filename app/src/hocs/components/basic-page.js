import React from 'react'

import { PageContainer } from '../../styles/components/containers'
import { MenuBar } from '../../styles/components/menu'
import { logout } from '../../utils'

export default (WrappedComponent) => {
  class BasicPage extends React.Component {
    onLogoutClick () {
      logout()
    }

    render () {
      return (
        <PageContainer>
          <MenuBar onLogoutClick={this.onLogoutClick} />
          <WrappedComponent />
        </PageContainer>
      )
    }
  }

  return BasicPage
}
