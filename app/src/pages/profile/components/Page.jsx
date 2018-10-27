import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Container from '../../../global/components/Container'
import Section from '../../../global/components/Section'
import Spinner from '../../../global/components/Spinner'
import PicturesSection from './PicturesSection'
import InfosSection from './InfosSection'
import MoreSection from './MoreSection'
import { FETCH_USER_REQUEST } from '../constants'
import { windowSizes } from '../../../config'

const Columns = styled.div`
  width: 100%;
  margin-left: 0rem !important;
  align-items: center;
`

class Profile extends Component {
  state = {
    windowWidth: window.innerWidth,
    userId: this.props.match.params.userId,
    isRefetching: false
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions)
    const { userId } = this.state

    this.props.dispatch({
      type: FETCH_USER_REQUEST,
      payload: { userId }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  componentWillUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.dispatch({
        type: FETCH_USER_REQUEST,
        payload: { isRefetching: this.isRefetching }
      })
    }
    if (this.props.match.params.userId && !nextProps.match.params.userId)
      this.setState({ userId: null })
  }

  updateDimensions = () => this.setState({ windowWidth: window.innerWidth })

  isRefetching = () => this.setState({ isRefetching: !this.state.isRefetching })

  render() {
    const { user } = this.props
    const { windowWidth, isRefetching } = this.state
    if (!user || isRefetching) return <Spinner />

    const PictureSectionComponent = (
      <PicturesSection
        isSelfProfile={!this.state.userId}
        pictures={user.pictures}
        windowWidth={windowWidth}
      />
    )

    return (
      <Section>
        <Container>
          <Columns className="columns">
            {windowWidth > windowSizes.tabletLg && PictureSectionComponent}
            <InfosSection isSelfProfile={!this.state.userId} user={user} />
            {windowWidth <= windowSizes.tabletLg && PictureSectionComponent}
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
