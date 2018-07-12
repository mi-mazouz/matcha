import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  &:focus {
    box-shadow: none !important;
  }
  background-image: ${props => props.backgroundImage};
  color: #ffffff !important;
  border-style: none !important;
`


const Button = ({ children, ...props }) => (
  <StyledButton
    {...props}
    className={`button ${props.isLoading && 'is-loading'}`}
    disabled={props.isDisabled}
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

export default Button