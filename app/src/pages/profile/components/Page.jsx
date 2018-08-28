import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
    this.props.dispatch({
      type: FETCH_USER_REQUEST
    })
  }

  render() {
    const { user } = this.props
    if (!user) return <Spinner />

    return (
      <Section>
        <Container>
          <Columns className="columns">
            <InfosSection user={user} />
            <PicturesSection />
            <MoreSection />
          </Columns>
        </Container>
      </Section>
    )
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object
}

Profile.defaultProps = {
  user: null
}

export default connect(store => ({
  user: store.profile.user
}))(Profile)
