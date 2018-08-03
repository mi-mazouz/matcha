import React, { Component } from 'react'
import styled from 'styled-components'

import Container from '../../common/components/Container'
import Section from '../../common/components/Section'
import PicturesSection from './PicturesSection'
import InfosSection from './InfosSection'

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
            <div className="column">
            </div>
          </Columns>
        </Container>
      </Section>
    )
  }
}

export default Profile