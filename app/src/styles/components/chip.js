import React from 'react'
import UiInputChip from 'material-ui-chip-input'

const InputChip = ({ label, ...props }) => {
  return (<UiInputChip
    {...props}
    clearOnBlur
  />)
}

export {
  InputChip
}
