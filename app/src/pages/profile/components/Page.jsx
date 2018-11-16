import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Container from '../../../global/components/Container'
import Section from '../../../global/components/Section'
import Spinner from '../../../global/components/Spinner'
import PicturesSectionComponent from './PicturesSection'
import InfosSection from './InfosSection'
import MoreSection from './MoreSection'
import { FETCH_USER_REQUEST } from '../constants'
import { windowSizes } from '../../../config/medias'

const Columns = styled.div`
  width: 100%;
  margin-left: 0rem !important;
  align-items: center;
`

class Profile extends Component {
  state = {
    windowWidth: window.innerWidth
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions)

    const { userId } = this.props.match.params

    this.props.dispatch({
      type: FETCH_USER_REQUEST,
      payload: { userId }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = () => this.setState({ windowWidth: window.innerWidth })

  render() {
    const { user, currentUserId } = this.props
    const { windowWidth } = this.state
    if (!user) return <Spinner />

    const isSelfProfile = user.id === currentUserId
    const PicturesSection = (
      <PicturesSectionComponent
        isSelfProfile={isSelfProfile}
        pictures={user.pictures}
        windowWidth={windowWidth}
      />
    )
    return (
      <Section>
        <Container>
          <Columns className="columns">
            {windowWidth > windowSizes.tabletLg && PicturesSection}
            <InfosSection isSelfProfile={isSelfProfile} user={user} />
            {windowWidth <= windowSizes.tabletLg && PicturesSection}
            <MoreSection isSelfProfile={isSelfProfile} />
          </Columns>
        </Container>
      </Section>
    )
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  currentUserId: PropTypes.number.isRequired,
  user: PropTypes.object
}

Profile.defaultProps = {
  user: null
}

export default connect(store => ({
  currentUserId: store.currentUser.id,
  user: store.profile.user
}))(Profile)
