import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from '../common/components/Logo'
import Title from '../common/components/Title'
import Form from './Form'

const PageContainer = styled.div`
  text-align: center;
`

const TitleWrapped = styled(Title)`
  color: #ffffff !important;
  margin-top: 20px;
`

const Section = styled.div`
  padding-bottom: 0rem !important;
`

class LandingPage extends Component {
  render() {
    return (
      <Section className="section">
        <PageContainer className="container">
          <Logo />
          <TitleWrapped className="title is-1">Find your soulmate</TitleWrapped>
          <Form />
        </PageContainer>
      </Section>
    )
  }
}

export default LandingPage