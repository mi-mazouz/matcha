import React from 'react'
import { Link } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable'

import '../css/links.css'

const TertiaryLink = muiThemeable()(({ muiTheme, ...props }) => (
  <Link
    {...props}
    style={{
      ...props.style,
      color: muiTheme.palette.beige
    }}
    className='tertiary-link'
  >
    {props.label}
  </Link>
  )
)

const SecondaryLink = muiThemeable()(({ muiTheme, ...props }) => (
  <Link
    {...props}
    style={{
      ...props.style,
      color: muiTheme.palette.beige
    }}
    className='secondary-link'
  >
    {props.label}
  </Link>
  )
)

export {
  SecondaryLink,
  TertiaryLink
}
