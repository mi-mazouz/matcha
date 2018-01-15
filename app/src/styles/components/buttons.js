import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import UiCheckBox from 'material-ui/Checkbox'

import { Container } from './containers'
import { Label } from './label'

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

const UploadFileButton = ({ label, onDrop, className, profile, id, multiple, ...props }) => (
  <Container
    className={className}
  >
    <input
      multiple={multiple}
      type='file'
      id={id}
      style={{display: 'none'}}
      accept='image/jpeg,image/png,image/jpg,image/gif'
      onChange={(event) => onDrop(event.target.files, profile)}
    />
    <Label
      style={{...props.labelStyle}}
      htmlFor={id}
    >
      {label}
    </Label>
  </Container>
)

const CheckBox = muiThemeable()(({ muiTheme, ...props }) => (
  <UiCheckBox
    iconStyle={{fill: muiTheme.palette.orange}}
    {...props}
  />
))

export {
  Button,
  CheckBox,
  UploadFileButton
}
