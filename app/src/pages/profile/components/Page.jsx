import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Container from '../../../global/components/Container'
import Section from '../../../global/components/Section'
import PicturesSectionComponent from './PicturesSection'
import InfosSection from './InfosSection'
import MoreSection from './MoreSection'
import Spinner from '../../../global/components/Spinner'
import { windowSizes } from '../../../config/medias'
import { FETCH_USER_REQUEST } from '../constants'

const Columns = styled.div`
  width: 100%;
  margin-left: 0rem !important;
  align-items: center;
`

class Profile extends Component {
  state = {
    windowWidth: window.innerWidth,
    profile: null,
    isSelfProfile: null
  }

  componentWillReceiveProps(nextProps) {
    const { userId: nextUserId } = nextProps.match.params
    const { currentUser } = this.props

    if (!this.props.profile && nextProps.profile) {
      this.setState({ isSelfProfile: false, profile: nextProps.profile })
    } else if (parseInt(nextUserId, 10) === currentUser.id) {
      this.setState({ isSelfProfile: true, profile: currentUser })
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions)

    const { userId } = this.props.match.params
    const { currentUser } = this.props

    if (parseInt(userId, 10) === currentUser.id) {
      return this.setState({ isSelfProfile: true, profile: currentUser })
    }

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
    const { windowWidth, profile, isSelfProfile } = this.state
    if (!profile) return <Spinner />

    const PicturesSection = (
      <PicturesSectionComponent
        isSelfProfile={isSelfProfile}
        pictures={profile.pictures}
        windowWidth={windowWidth}
      />
    )

    return (
      <Section>
        <Container>
          <Columns className="columns">
            {windowWidth > windowSizes.tabletLg && PicturesSection}
            <InfosSection isSelfProfile={isSelfProfile} user={profile} />
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
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  profile: PropTypes.object
}

Profile.defaultProps = {
  profile: null
}

export default connect(store => ({
  currentUser: store.currentUser,
  profile: store.profile
}))(Profile)
