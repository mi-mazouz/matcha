import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MuiBadge from '@material-ui/core/Badge'
import { withTheme } from '@material-ui/core/styles'

const StyledBadge = withTheme()(styled(MuiBadge)`
  & > span:last-child {
    top: ${props => props.top}px;
    right: ${props => props.right}px;
    background-color: ${props => props.theme.palette.purple};
    color: white;
  }
`)

const Badge = ({ children, badgeContent, ...props }) => (
  <StyledBadge badgeContent={badgeContent} {...props}>
    {children}
  </StyledBadge>
)

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  badgeContent: PropTypes.number.isRequired
}

export default Badge
