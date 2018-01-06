import React from 'react'
import Formsy from 'formsy-react'

import '../css/form.css'

const Form = ({ children, ...props }) => (
  <Formsy.Form
    {...props}
    className='form'
  >
    {children}
  </Formsy.Form>
)

export {
  Form
}
