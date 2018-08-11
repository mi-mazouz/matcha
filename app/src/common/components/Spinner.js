import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withTheme } from '@material-ui/core/styles'

const SpinnerContainer = withTheme()(styled.div`
  & > div {
    color: ${props => props.theme.palette.mixGradient};
  }
  position: absolute;
  top: 45%;
  right: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
`)

const Spinner = ({size, ...props}) => (
  <SpinnerContainer {...props}>
    <CircularProgress size={size || 100} />
  </SpinnerContainer>
)

Spinner.propTypes = {
  size: PropTypes.number
}

export default Spinner