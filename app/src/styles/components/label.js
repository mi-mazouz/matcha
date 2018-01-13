import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import InplaceEdit from 'react-edit-inplace'

const Label = muiThemeable()(({ muiTheme, children, ...props }) => (
  <label
    style={{
      ...props.style,
      fontFamily: muiTheme.fontFamily
    }}
  >
    {children}
  </label>
))

const LabelInput = muiThemeable()(({ muiTheme, text, onChange, paramName, ...props }) => (
  <InplaceEdit
    style={{
      fontFamily: muiTheme.fontFamily,
      height: '20px',
      width: '170px',
      ...props.style
    }}
    text={text || ''}
    paramName={paramName}
    change={onChange}
  />
))

export {
  Label,
  LabelInput
}
