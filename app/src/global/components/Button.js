import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  &:focus {
    box-shadow: none !important;
  }
  background-image: ${props => props.backgroundImage};
  background-color: ${props => props.backgroundColor} !important;
  color: #ffffff !important;
  border-style: none !important;
  font-weight: 600;
`

const Button = ({ children, isLoading, isDisabled, isSmall, ...props }) => (
  <StyledButton
    {...props}
    className={classnames('button', { 'is-loading': isLoading, 'is-small': isSmall })}
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
  backgroundImage: null,
  backgroundColor: null,
  className: null,
  isDisabled: false,
  isLoading: false
}

export default Button
