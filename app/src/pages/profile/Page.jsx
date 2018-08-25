import React, { Component } from 'react'
import styled from 'styled-components'

import Container from '../../global/components/Container'
import Section from '../../global/components/Section'
import PicturesSection from './PicturesSection'
import InfosSection from './InfosSection'
import MoreSection from './MoreSection'

const Columns = styled.div`
  width: 100%;
  margin-left: 0rem !important;
`

class Profile extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Columns className="columns">
            <InfosSection />
            <PicturesSection />
            <MoreSection />
          </Columns>
        </Container>
      </Section>
    )
  }
}

export default Profile
