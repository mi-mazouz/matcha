import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import LandingPage from '../pages/landing/Page'
import SignInPage from '../pages/authentication/sign-in/Page'
import SignUpPage from '../pages/authentication/sign-up/Page'
import LogoutNavBar from '../common/components/LogoutNavBar'
import StyledPage from '../common/components/Page'

import landingPageBackgroundImage2x from '../pages/landing/assets/background@2x.jpg'
import landingPageBackgroundImage from '../pages/landing/assets/background.jpg'

const Page = styled(StyledPage)`
  background-image: url(${landingPageBackgroundImage2x});
  @media screen and (max-width : 568px) {
    background-image: url(${landingPageBackgroundImage});
  }
`

const LogoutLayout = () => (
  <Page>
    <LogoutNavBar />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/sign-in" component={SignInPage} />
      <Route exact path="/sign-up" component={SignUpPage} />
      <Redirect to="/" />
    </Switch>
  </Page>
)

LogoutLayout.propTypes = {
  location: PropTypes.object.isRequired
}

export default LogoutLayout