import React from 'react'
import styled from 'styled-components'
import Protypes from 'prop-types'

import logoImage from '../assets/logo.png'
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
    alt=""
  />
)

Logo.propTypes = {
  isNavbar: Protypes.bool
}

export default Logo