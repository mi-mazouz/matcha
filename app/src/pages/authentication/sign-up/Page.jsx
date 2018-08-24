import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

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
