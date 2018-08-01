import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import NavBar from './NavBar'
import LandingPage from '../../pages/landing'
import SignIn from '../../pages/authentication/sign-in'
import SignUp from '../../pages/authentication/sign-up'
import StyledPage from '../../common/components/Page'

import landingPageBackgroundImage from '../../pages/landing/assets/background.jpg'
import authenticationBackgroundImage from '../../pages/authentication/assets/background.png'
import mobileBackgroundImage from '../../pages/assets/mobile-background.jpg'

const Page = styled(StyledPage)`
  background-image: ${props => props.location.pathname === '/'
    ? `url(${landingPageBackgroundImage})`
    : `url(${authenticationBackgroundImage})`};
  @media screen and (max-width : 568px) {
    background-image: url(${mobileBackgroundImage});
  }
`

const LogoutLayout = ({ location }) => (
  <Page location={location}>
    <NavBar />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <Redirect to="/" />
    </Switch>
  </Page>
)

LogoutLayout.propTypes = {
  location: PropTypes.object.isRequired
}

export default LogoutLayout