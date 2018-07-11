import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LandingPage from './Layouts/LandingPage'

export default () => (
  <Switch>
    <Route path="/" component={LandingPage} />
    <Redirect to="/" />
  </Switch>
)