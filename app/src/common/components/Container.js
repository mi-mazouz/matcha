import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledContainer = styled.div`
  text-align: center;
  width: 100% !important;
`

const Container = ({ children }) => (
  <StyledContainer className="container">
    { children }
  </StyledContainer>
)

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export default Container