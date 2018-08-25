import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Logo from '../../../global/components/Logo'
import StyledTitle from '../../../global/components/Title'
import Container from '../../../global/components/Container'
import StyledSection from '../../../global/components/Section'
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
    const { t } = this.props

    return (
      <Section>
        <Container>
          <Logo />
          <Title className="is-1">{t('title_page.sign_up')}</Title>
          <Form />
        </Container>
      </Section>
    )
  }
}

SignUp.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(SignUp)
