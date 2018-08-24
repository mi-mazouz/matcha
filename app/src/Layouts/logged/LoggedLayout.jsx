import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './NavBar'
import Profile from '../../pages/profile'
import Page from '../../common/components/Page'

const LoggedLayout = ({ location }) => (
  <Page>
    <NavBar location={location} />
    <Switch>
      <Route exact path="/dashboard/profile" component={Profile} />
      <Redirect to="/dashboard/profile" />
    </Switch>
  </Page>
)

LoggedLayout.propTypes = {
  location: PropTypes.object.isRequired
}

export default LoggedLayout
