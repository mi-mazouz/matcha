import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import LandingPage from '../landing-page'
import LogoutNavBar from '../common/components/LogoutNavBar'
import StyledPage from '../common/components/Page'

import landingPageBackgroundImage2x from '../landing-page/assets/background@2x.jpg'
import landingPageBackgroundImage from '../landing-page/assets/background.jpg'

const Page = styled(StyledPage)`
  ${props => props.location.pathname === '/' && `background-image: url(${landingPageBackgroundImage2x});`}
  @media screen and (max-width : 568px) {
    ${props => props.location.pathname === '/' && `background-image: url(${landingPageBackgroundImage});`}
  }
`

const LogoutLayout = ({ location }) => (
  <Page location={location}>
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