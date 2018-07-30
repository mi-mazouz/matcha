import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from '../../common/components/Logo'
import Container from '../../common/components/Container'
import styledTitle from '../../common/components/Title'
import StyledSection from '../../common/components/Section'
import Form from './Form'

const Title = styled(styledTitle)`
  color: #ffffff !important;
  margin-top: 20px;
`

const Section = styled(StyledSection)`
  padding-bottom: 0rem !important;
`

class LandingPage extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Logo />
          <Title className="is-1">Find your soulmate</Title>
          <Form />
        </Container>
      </Section>
    )
  }
}

export default LandingPage