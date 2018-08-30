import React, { Component } from 'react'
import { translate } from 'react-i18next'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Logo from '../../../global/components/Logo'
import Container from '../../../global/components/Container'
import styledTitle from '../../../global/components/Title'
import StyledSection from '../../../global/components/Section'
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
    const { t } = this.props

    return (
      <Section>
        <Container>
          <Logo />
          <Title className="is-1">{t('title_page.landing_page')}</Title>
          <Form />
        </Container>
      </Section>
    )
  }
}

LandingPage.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(LandingPage)
