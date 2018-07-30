import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

import LogoutLayout from './Layouts/logout/LogoutLayout'
import LoggedLayout from './Layouts/logged/LoggedLayout'
import { history, muiTheme } from './config'
import { createStore } from './store'
import { IsLogout, IsLogged } from './hocs/components'

const store = createStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <Router history={history}>
            <Switch>
              <Route path="/dashboard" component={IsLogged(LoggedLayout)} />
              <Route path="/" component={IsLogout(LogoutLayout)} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App