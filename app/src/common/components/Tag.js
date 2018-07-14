import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'

const Delete = styled.span`
  margin-left: 0px !important;
  cursor: pointer;
`

const StyledTag = withTheme()(styled.span`
  font-weight: bold;
  color: #ffffff !important;
  background-color: ${props => props.backgroundColor || props.theme.palette.grey} !important;
`)

const Tag = ({ children, onDelete, size, backgroundColor, className }) => (
  <div className={`tags has-addons ${className}`}>
    <StyledTag backgroundColor={backgroundColor} className={`tag ${size}`}>
      { children }
    </StyledTag>
    <Delete className={`tag ${size} is-delete`} onClick={onDelete} />
  </div>
)

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  onDelete: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  className: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default Tag