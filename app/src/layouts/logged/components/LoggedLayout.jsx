import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Spinner from '../../../global/components/Spinner'
import NavBar from './NavBar'
import Profile from '../../../pages/profile'
import Page from '../../../global/components/Page'
import { GET_CURRENT_USER_REQUEST } from '../constants'

class LoggedLayout extends Component {
  componentWillMount() {
    const { currentUserId, dispatch } = this.props

    if (!currentUserId) dispatch({ type: GET_CURRENT_USER_REQUEST })
  }

  render() {
    const { location, currentUserId } = this.props
    if (!currentUserId) return <Spinner />

    return (
      <Page>
        <NavBar currentUserId={currentUserId} location={location} />
        <Switch>
          <Route exact path="/profile/:userId" component={Profile} />
          <Redirect to={`/profile/${currentUserId}`} />
        </Switch>
      </Page>
    )
  }
}

LoggedLayout.propTypes = {
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentUserId: PropTypes.number
}

LoggedLayout.defaultProps = {
  currentUserId: null
}

export default connect(store => ({
  currentUserId: store.currentUser.id
}))(LoggedLayout)
