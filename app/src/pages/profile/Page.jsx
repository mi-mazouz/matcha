import React, { Component } from 'react'

import Container from '../../common/components/Container'
import Title from '../../common/components/Title'
import Section from '../../common/components/Section'

class LandingPage extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Title className="is-1">Hello World!</Title>
        </Container>
      </Section>
    )
  }
}

export default LandingPage