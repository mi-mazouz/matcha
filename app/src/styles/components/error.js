import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import messageErrors from '../../config/message-errors'

const Error = muiThemeable()(({ muiTheme, ...props }) => (
  <p
    style={{
      ...props.style,
      fontSize: '14px',
      fontFamily: muiTheme.fontFamily,
      color: muiTheme.palette.red
    }}>
    { messageErrors[props.errorMessage] }
  </p>
))

export {
  Error
}
