import React from 'react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'

import '../css/fields.css'

const TextField = ({ ...props }) => (
  <FormsyText
    {...props}
    className='text-field'
    style={{
      width: !props.width ? '100%' : props.width
    }}
  />
)

export {
  TextField
}
