import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from '../../common/components/Logo'
import Container from '../../common/components/Container'
import Title from '../../common/components/Title'
import Form from './Form'

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
        <Container>
          <Logo />
          <TitleWrapped className="title is-1">Find your soulmate</TitleWrapped>
          <Form />
        </Container>
      </Section>
    )
  }
}

export default LandingPage