import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import NotificationSystem from 'react-notification-system'

import { NOTIFICATION_REMOVED } from '../../global/constants'
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
  componentDidMount () {
    const { notification } = this.props
    if (notification) this.refs.notificationSystem.addNotification({
      ...notification,
      onRemove: () => this.props.dispatch({ type: NOTIFICATION_REMOVED })
    })
  }
  
  _notificationSystem = null
 
  render () {
    const { t } = this.props

    return (
      <Section>
        <NotificationSystem ref="notificationSystem" />
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
  t: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  notification: PropTypes.object
}

export default connect(store => ({ notification: store.notification}))(translate()(LandingPage))