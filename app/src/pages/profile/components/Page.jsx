import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FETCH_USER_REQUEST } from '../constants'
import Container from '../../../global/components/Container'
import Section from '../../../global/components/Section'
import Spinner from '../../../global/components/Spinner'
import PicturesSection from './PicturesSection'
import InfosSection from './InfosSection'
import MoreSection from './MoreSection'

const Columns = styled.div`
  width: 100%;
  margin-left: 0rem !important;
`

class Profile extends Component {
  componentWillMount() {
    const { userId } = this.props.match.params

    this.props.dispatch({
      type: FETCH_USER_REQUEST,
      payload: { userId }
    })
  }

  componentWillUpdate(nextProps) {
    const regex = /^(\/profile\/.*?[0-9])$/

    if (
      regex.test(this.props.location.pathname) &&
      this.props.location.pathname !== nextProps.location.pathname
    ) {
      this.props.dispatch({
        type: FETCH_USER_REQUEST
      })
    }
  }

  render() {
    const { user } = this.props
    if (!user) return <Spinner />

    return (
      <Section>
        <Container>
          <Columns className="columns">
            <InfosSection user={user} />
            <PicturesSection pictures={user.pictures} />
            <MoreSection />
          </Columns>
        </Container>
      </Section>
    )
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object
}

Profile.defaultProps = {
  user: null
}

export default connect(store => ({
  user: store.profile.user
}))(Profile)
