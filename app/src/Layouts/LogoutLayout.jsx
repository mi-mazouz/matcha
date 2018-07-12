import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import LandingPage from '../landing-page'
import LogoutNavBar from '../common/styles/components/LogoutNavBar'
import Page from '../common/styles/components/Page'

import landingPageBackgroundImage from '../landing-page/assets/background.jpg'

const LogoutLayout = ({ location }) => (
  <Page
    backgroundImage={
      location.pathname === '/' ? landingPageBackgroundImage : ''
    }
  >
    <LogoutNavBar />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Redirect to="/" />
    </Switch>
  </Page>
)

LogoutLayout.propTypes = {
  location: PropTypes.object.isRequired
}

export default LogoutLayout