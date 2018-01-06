import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'

const Button = muiThemeable()(({ muiTheme, ...props }) => (
  <RaisedButton
    {...props}
    overlayStyle={{
      backgroundColor: 'none'
    }}
    disableTouchRipple
    disabledBackgroundColor={muiTheme.palette.lightGrey}
    disabledLabelColor={muiTheme.palette.orange}
    labelColor={muiTheme.palette.orange}
  />
))

export {
  Button
}
