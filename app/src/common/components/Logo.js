import React from 'react'
import styled from 'styled-components'

import logoImage from '../assets/logo.png'
import logoImage2x from '../assets/logo@2x.png'
import logoImage3x from '../assets/logo@3x.png'

const StyledLogo = styled.img`
  ${props => props.size && `width: ${props.size}px;`}
  max-height: unset !important
`

const Logo = ({ ...props }) => (
  <StyledLogo
    {...props}
    className="logo"
    src={logoImage}
    srcSet={`${logoImage2x} 2x, ${logoImage3x} 3x`}
    alt=""
  />
)

export default Logo