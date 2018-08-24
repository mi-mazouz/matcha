import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Logo from '../../../common/components/Logo'
import styledTitle from '../../../common/components/Title'
import Section from '../../../common/components/Section'
import Container from '../../../common/components/Container'
import Form from './Form'

const Title = styled(styledTitle)`
  color: #ffffff !important;
  margin-top: 20px;
`

class SignIn extends Component {
  render() {
    const { t } = this.props

    return (
      <Section>
        <Container>
          <Logo />
          <Title className="title is-1">{t('title_page.sign_in')}</Title>
          <Form />
        </Container>
      </Section>
    )
  }
}

SignIn.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(SignIn)
