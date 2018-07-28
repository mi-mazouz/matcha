import React from 'react'
import styled from 'styled-components'
import MuiPaper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

const StyledPaper = styled(MuiPaper)`
  display: flex;
  align-items: center;
`

const Paper = ({ children, ...props }) => (
  <StyledPaper {...props}>
    { children }
  </StyledPaper>
)
  
Paper.propTypes = {
  children: PropTypes.node.isRequired
}

export default Paper