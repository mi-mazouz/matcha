import React from 'react'
import styled from 'styled-components'
import Protypes from 'prop-types'

import logoImage from '../assets/logo.png'
import logoNavbarImage from '../../layouts/logged/assets/logo-navbar.png'

const StyledLogo = styled.img`
  width: ${props => (props.size ? `${props.size}` : '150')}px;
  max-height: unset !important;
`

const Logo = ({ isNavbar, ...props }) => (
  <StyledLogo {...props} className="logo" src={isNavbar ? logoNavbarImage : logoImage} alt="" />
)

Logo.propTypes = {
  isNavbar: Protypes.bool
}

Logo.defaultProps = {
  isNavbar: false
}

export default Logo
