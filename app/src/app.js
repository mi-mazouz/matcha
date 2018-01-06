import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createHistory from 'history/createHashHistory'
import qhistory from 'qhistory'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { stringify, parse } from 'qs'

import Routes from './routes'
import muiTheme from './config/mui-theme'

class App extends React.Component {
  render () {
    const history = qhistory(
      createHistory(),
      stringify,
      parse
    )

    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router history={history}>
            {Routes}
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
