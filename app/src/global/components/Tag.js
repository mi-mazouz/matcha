import React from 'react'
import classnames from 'classnames'
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
  <div className={classnames('tags has-addons', className)}>
    <StyledTag backgroundColor={backgroundColor} className={classnames('tag', size)}>
      {children}
    </StyledTag>
    <Delete className={classnames('tag is-delete', size)} onClick={onDelete} />
  </div>
)

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  onDelete: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  className: PropTypes.string,
  backgroundColor: PropTypes.string
}

Tag.defaultProps = {
  className: null,
  backgroundColor: null
}

export default Tag
