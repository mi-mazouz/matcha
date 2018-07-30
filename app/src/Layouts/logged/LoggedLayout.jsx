import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './NavBar'
import Profile from '../../pages/profile'
import Page from '../../common/components/Page'

const LoggedLayout = () => (
  <Page>
    <Switch>
      <NavBar />
      <Route exact path="/dashboard/profile" component={Profile} />
      <Redirect to="/dashboard/profile" />
    </Switch>
  </Page>
)

export default LoggedLayout