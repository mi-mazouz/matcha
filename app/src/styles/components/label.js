import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import InplaceEdit from 'react-edit-inplace'

const Label = muiThemeable()(({ muiTheme, children, ...props }) => (
  <label
    {...props}
    style={{
      ...props.style,
      fontFamily: muiTheme.fontFamily
    }}
  >
    {children}
  </label>
))

const LabelInput = muiThemeable()(({ muiTheme, text, onChange, paramName, ...props }) => {
  const customValidateText = (text) => {
    if (props.maxLength) return text.length < props.maxLength
    return true
  }

  return (
    <InplaceEdit
      {...props}
      style={{
        fontFamily: muiTheme.fontFamily,
        height: '25px',
        width: '110px',
        ...props.style
      }}
      text={text || ''}
      validate={customValidateText}
      paramName={paramName}
      change={onChange}
    />
  )
})

export {
  Label,
  LabelInput
}
