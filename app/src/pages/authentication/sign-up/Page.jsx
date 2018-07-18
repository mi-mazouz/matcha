import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from '../../../common/components/Logo'
import Title from '../../../common/components/Title'
import Container from '../../../common/components/Container'
import Form from './Form'

const TitleWrapped = styled(Title)`
  color: #ffffff !important;
  margin-top: 20px;
`
class SignUpPage extends Component {
  render() {
    return (
      <div className="sectin">
        <Container>
          <Logo />
          <TitleWrapped className="title is-1">Sign Up!</TitleWrapped>
          <Form />
        </Container>
      </div>
    )
  }
}

export default SignUpPage