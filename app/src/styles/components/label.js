import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

const Label = muiThemeable()(({ muiTheme, children, fontSize, ...props }) => (
  <label
    style={{
      fontFamily: muiTheme.fontFamily,
      fontSize: fontSize
    }}
  >
    {children}
  </label>
))

export {
  Label
}
