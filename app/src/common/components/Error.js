import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'

const ErrorContainer = styled.div`
  padding: 10px;
`

const ErrorText = withTheme()(styled.strong`
  color: ${props => props.theme.palette.red}
`)

const Error = ({ children }) => (
  <ErrorContainer>
    <ErrorText>{ children }</ErrorText>
  </ErrorContainer>
)

Error.propTypes = {
  children: PropTypes.node.isRequired
}

export default Error