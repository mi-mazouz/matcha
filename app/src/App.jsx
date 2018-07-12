import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

import LogoutLayout from './Layouts/LogoutLayout'
import { history, muiTheme } from './config'
import { createStore } from './store'

const store = createStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <Router history={history}>
            <Switch>
              <Route path="/" component={LogoutLayout} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App