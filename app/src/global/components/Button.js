import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  &:focus {
    box-shadow: none !important;
  }
  background-image: ${props => props.backgroundImage};
  color: #ffffff !important;
  border-style: none !important;
`

const Button = ({ children, isLoading, isDisabled, ...props }) => (
  <StyledButton
    {...props}
    className={classnames('button', { 'is-loading': isLoading })}
    disabled={isDisabled}
  >
    {children}
  </StyledButton>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool
}

Button.defaultProps = {
  className: null,
  isDisabled: false,
  isLoading: false
}

export default Button
