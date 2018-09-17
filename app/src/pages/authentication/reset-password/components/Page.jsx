import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Logo from '../../../../global/components/Logo'
import StyledTitle from '../../../../global/components/Title'
import Section from '../../../../global/components/Section'
import Container from '../../../../global/components/Container'
import Form from './Form'

const Title = styled(StyledTitle)`
  color: #ffffff !important;
  margin-top: 20px;
`

class ResetPassword extends Component {
  render() {
    const { t } = this.props

    return (
      <Section>
        <Container>
          <Logo />
          <Title className="title is-1">{t('title_page.reset_password')}</Title>
          <Form />
        </Container>
      </Section>
    )
  }
}

ResetPassword.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(ResetPassword)
