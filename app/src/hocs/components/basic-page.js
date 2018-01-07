import React from 'react'

import { PageContainer } from '../../styles/components/containers'
import { MenuBar } from '../../styles/components/menu'

export default (WrappedComponent) => {
  class BasicPage extends React.Component {
    render () {
      return (
        <PageContainer>
          <MenuBar />
          <WrappedComponent />
        </PageContainer>
      )
    }
  }

  return BasicPage
}
