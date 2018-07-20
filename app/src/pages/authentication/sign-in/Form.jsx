import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../../../common/components/Button'
import { InputWithIcons } from '../../../common/components/Input'
import { isEmail } from '../../../utils'

const Form = styled.form`
  width: 300px;
  margin: auto
`

const validate = (values) => {
  const errors = {}

  if (!values.email) errors.email = 'Required'
  else if (!isEmail(values.email)) errors.email = 'Unexcepted email'
  if (!values.password) errors.password = 'Required'
  
  return errors
}

class SignInForm extends Component {
  renderInput = ({ input, meta, placeholder, ...props }) => {
    const error = (meta.error && meta.touched && !meta.active) || false
    const isValid = !meta.error && meta.touched && !meta.active
    
    return (
      <InputWithIcons
        {...input}
        {...props}
        error={error}
        isValid={isValid}
        placeholder={error ? meta.error : placeholder}
      />
    )
  }

  handleSubmit = (values) => new Promise((resolve, reject) => {
    this.props.dispatch({
      type: 'SIGNIN_PAGE_FORM_SUBMIT',
      payload: { values, resolve, reject }
    })
  })

  render() {
    return (
      <Form className="form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className="columns">
          <div className="column">
            <Field
              name="email"
              icon="user"
              placeholder='Email'
              type="email"
              component={this.renderInput}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Field
              icon="lock"
              name="password"
              placeholder='Password'
              type="password"
              component={this.renderInput}
            />
          </div>
        </div>
        <Button
          backgroundImage={this.props.theme.palette.mixGradient}
          type="submit"
          isLoading={this.props.submitting}
          isDisabled={this.props.submitting}
        >
          Sign In!
        </Button>
      </Form>
    )
  }
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  submitting: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

export default compose(
  connect(),
  reduxForm({
    form: 'signInPage',
    validate
  })
)(withTheme()(SignInForm))
