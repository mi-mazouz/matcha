import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { InputWithIcons } from '../../../common/components/Input'
import { isBirthDateValid, isEmail } from '../../../utils'
import Button from '../../../common/components/Button'
import Select from '../../../common/components/Select'

const Form = styled.form`
  width: 435px;
  margin: auto
`
const Columns = styled.div`
  display: flex !important;
`
const validate = (values) => {
  const errors = {}

  if (!values.lookingFor) errors.lookingFor = 'Required'
  if (!values.gender) errors.gender = 'Required'
  if (!values.username) errors.username = 'Required'
  if (!values.birthDate) errors.birthDate = 'Required'
  else if (!isBirthDateValid(values.birthDate)) errors.birthDate = 'Wrong format'
  if (!values.email) errors.email = 'Required'
  else if (!isEmail(values.email)) errors.email = 'Wrong format'
  if (!values.password) errors.password = 'Required'
  
  return errors
}

class SignUpFormPage extends Component {
  renderSelect = ({ input, children }) => (
    <Select input={input}>
      { children }
    </Select>
  )

  renderInput = ({ input, meta, placeholder, ...props }) => {
    const error = (meta.error && meta.touched && !meta.active) || false
    const isValid = !meta.error && meta.touched && !meta.active
    
    if (error) input.value = ''
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
      type: 'SIGNUP_PAGE_FORM_SUBMIT',
      payload: { values, resolve, reject }
    })
  })

  render() {
    return (
      <Form className="form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Columns className="columns">
          <div className="column">
            <Field name="gender" component={this.renderSelect}>
              <option  value="" disabled>I am</option>
              <option >Female</option>
              <option >Male</option>
            </Field>
          </div>
          <div className="column">
            <Field name="lookingFor" component={this.renderSelect}>
              <option value="" disabled>Looking for</option>
              <option >Female</option>
              <option >Male</option>
            </Field>
          </div>
        </Columns>
        <Columns className="columns">
          <div className="column is-half">
            <Field
              name="username"
              icon="user"
              placeholder='Username'
              type="text"
              component={this.renderInput}
            />
          </div>
          <div className="column">
            <Columns className="columns">
              <div className="column">
                <Field
                  name="birthDate"
                  icon="calendar-alt"
                  placeholder='Ex: 08/06/1954'
                  type="text"
                  component={this.renderInput}
                />
              </div>
            </Columns>
          </div>
        </Columns>
        <Columns className="columns">
          <div className="column">
            <Field
              name="email"
              icon="envelope"
              placeholder='Email'
              type="email"
              component={this.renderInput}
            />
          </div>
          <div className="column">
            <Field
              name="password"
              icon="lock"
              placeholder='Password'
              type="password"
              component={this.renderInput}
            />
          </div>
        </Columns>
        <Button
          backgroundImage={this.props.theme.palette.mixGradient}
          type="submit"
          isLoading={this.props.submitting}
          isDisabled={this.props.submitting}
        >
          Sign Up!
        </Button>
      </Form>
    )
  }
}

SignUpFormPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  submitting: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

export default compose(
  connect(),
  reduxForm({
    form: 'signUpPage',
    validate
  })
)(withTheme()(SignUpFormPage))