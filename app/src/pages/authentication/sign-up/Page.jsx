import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from '../../../common/components/Logo'
import StyledTitle from '../../../common/components/Title'
import Container from '../../../common/components/Container'
import StyledSection from '../../../common/components/Section'
import Form from './Form'

const Title = styled(StyledTitle)`
  color: #ffffff !important;
  margin-top: 20px;
`

const Section = styled(StyledSection)`
  padding-bottom: 0rem !important;
`

class SignUp extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Logo />
          <Title className="is-1">Sign Up!</Title>
          <Form />
        </Container>
      </Section>
    )
  }
}

export default SignUp