import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Profile from '../pages/profile'
import Page from '../common/components/Page'

const LoggedLayout = () => (
  <Page>
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Redirect to="/profile" />
    </Switch>
  </Page>
)

export default LoggedLayout