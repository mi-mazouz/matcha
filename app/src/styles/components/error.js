import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import * as messageErrors from '../../config/message-errors'

const Error = muiThemeable()(({ muiTheme, ...props }) => (
  <p
    style={{
      ...props.style,
      fontSize: '14px',
      fontFamily: muiTheme.fontFamily,
      color: muiTheme.palette.red
    }}>
    { getErrorLabel(props.errorMessage) }
  </p>
))

const getErrorLabel = (errorMessage) => {
  switch (errorMessage) {
    case 'EMAIL_ALREADY_EXISTS':
      return messageErrors.EMAIL_ALREADY_EXISTS
    case 'INVALID_EMAIL_OR_PASSWORD':
      return messageErrors.INVALID_EMAIL_OR_PASSWORD
    case 'EMAIL_NOT_FOUND':
      return messageErrors.EMAIL_NOT_FOUND
    default:
      return null
  }
}

export {
  Error
}
