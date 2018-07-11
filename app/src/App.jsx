import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { history, muiTheme, axios } from './config'
import { createStore } from './store'
import Routes from './routes'

const store = createStore()

class App extends Component {
  componentWillMount () {
    axios.initInterceptorRequest()
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router history={history}>
            <Routes />
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App