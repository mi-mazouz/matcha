import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from '../../../common/components/Logo'
import styledTitle from '../../../common/components/Title'
import Container from '../../../common/components/Container'
import Form from './Form'

const Title = styled(styledTitle)`
  color: #ffffff !important;
  margin-top: 20px;
`

class SignInPage extends Component {
  render() {
    return (
      <div className="section">
        <Container>
          <Logo />
          <Title className="title is-1">Sign In!</Title>
          <Form />
        </Container>
      </div>
    )
  }
}

export default SignInPage