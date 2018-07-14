import React from 'react'

import Logo from '../assets/logo.png'
import Logo2x from '../assets/logo@2x.png'
import Logo3x from '../assets/logo@3x.png'

export default () => (
  <img
    className="logo"
    src={Logo}
    srcSet={`${Logo2x} 2x, ${Logo3x} 3x`}
    alt=""
  />
)