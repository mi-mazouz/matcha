import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './NavBar'
import Profile from '../../pages/profile'
import Page from '../../global/components/Page'

const LoggedLayout = ({ location }) => (
  <Page>
    <NavBar location={location} />
    <Switch>
      <Route exact path="/profile/self" component={Profile} />
      <Route exact path="/profile/:userId" component={Profile} />
      <Redirect to="/profile/self" />
    </Switch>
  </Page>
)

LoggedLayout.propTypes = {
  location: PropTypes.object.isRequired
}

export default LoggedLayout
