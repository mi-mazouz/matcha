import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  &:focus {
    border-color: transparent !important;
    box-shadow: none !important;
  }
  opacity: 0.8;
`

const Input = ({ ...props }) => (
  <StyledInput
    className="input"
    {...props}
  />
)

export default Input