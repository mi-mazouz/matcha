import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import isAuthenticated from './hocs/components/authentication'
import Signin from './authentication/containers/signin'
import Signup from './authentication/containers/signup'
import ResetPassword from './authentication/containers/reset-password'
import Profile from './profile/containers/profile'

const Routes = (
  <Switch>
    <Route path='/signin' component={Signin} />
    <Route path='/signup' component={Signup} />
    <Route path='/reset-password' component={ResetPassword} />
    <Route path='/profil' component={isAuthenticated(Profile)} />
    <Redirect to='/profil' />
  </Switch>
)

export default Routes
