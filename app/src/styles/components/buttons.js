import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Dropzone from 'react-dropzone'

const Button = muiThemeable()(({ muiTheme, ...props }) => (
  <RaisedButton
    {...props}
    overlayStyle={{
      backgroundColor: 'none'
    }}
    disableTouchRipple
    disabledBackgroundColor={muiTheme.palette.lightBeige}
    disabledLabelColor={muiTheme.palette.orange}
    labelColor={muiTheme.palette.orange}
  />
))

const UploadFileButton = ({ children, ...props }) => (
  <Dropzone
    accept='image/jpeg,image/png,image/jpg,image/gif'
    {...props}
  >
    { children }
  </Dropzone>
)

export {
  Button,
  UploadFileButton
}
