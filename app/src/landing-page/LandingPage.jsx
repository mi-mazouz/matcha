import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from '../common/styles/components/Logo'
import Title from '../common/styles/components/Title'
import Form from './Form'

const PageContainer = styled.div`
  text-align: center;
`

const TitleWrapped = styled(Title)`
  color: #ffffff !important;
  margin-top: 20px;
`

class LandingPage extends Component {
  render() {
    return (
      <div className="section">
        <PageContainer className="container">
          <Logo />
          <TitleWrapped className="title is-1">Find your soulmate</TitleWrapped>
          <Form />
        </PageContainer>
      </div>
    )
  }
}

export default LandingPage