import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

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