import React from 'react'
import styled from 'styled-components'
import Protypes from 'prop-types'

import logoImage from '../assets/logo.png'
import logoImage2x from '../assets/logo@2x.png'
import logoImage3x from '../assets/logo@3x.png'
import logoNavbarImage from '../assets/logo-navbar.png'

const StyledLogo = styled.img`
  ${props => props.size && `width: ${props.size}px;`}
  max-height: unset !important
`

const Logo = ({ isNavbar, ...props }) => (
  <StyledLogo
    {...props}
    className="logo"
    src={isNavbar ? logoNavbarImage : logoImage}
    srcSet={`${logoImage2x} 2x, ${logoImage3x} 3x`}
    alt=""
  />
)

Logo.propTypes = {
  isNavbar: Protypes.bool
}

export default Logo