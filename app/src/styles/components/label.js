import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import '../css/label.css'

const TertiaryLabel = muiThemeable()(({ muiTheme, children, ...props }) => (
  <label
    style={{fontFamily: muiTheme.fontFamily}}
    className='tertiary_label'
  >
    {children}
  </label>
))

export {
  TertiaryLabel
}
