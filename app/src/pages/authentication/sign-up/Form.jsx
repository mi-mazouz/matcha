import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { reduxForm, Field } from 'redux-form'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  isBirthDate,
  isName,
  isEmail,
  isPassword,
  isUsername
} from '../../../utils'
import { InputWithIcons } from '../../../common/components/Input'
import Button from '../../../common/components/Button'

const Form = styled.form`
  width: 435px;
  margin: auto
`
const Columns = styled.div`
  display: flex !important;
`
const validate = (values) => {
  const errors = {}

  if (!values.firstName) errors.firstName = 'Required'
  else if (!isName(values.firstName)) errors.firstName = 'Wrong format'

  if (!values.lastName) errors.lastName = 'Required'
  else if (!isName(values.lastName)) errors.lastName = 'Wrong format'

  if (!values.username) errors.username = 'Required'
  else if (!isUsername(values.username)) errors.username = 'Wrong format'

  if (!values.birthDate) errors.birthDate = 'Required'
  else if (!isBirthDate(values.birthDate)) errors.birthDate = 'Wrong format'

  if (!values.email) errors.email = 'Required'
  else if (!isEmail(values.email)) errors.email = 'Wrong format'

  if (!values.password) errors.password = 'Required'
  else if (!isPassword(values.password)) errors.password = 'Password not safe'
  
  return errors
}

class SignUpForm extends Component {
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
        placeholder={error ? this.props.t(meta.error) : placeholder}
      />
    )
  }

  handleSubmit = (values) => new Promise((resolve, reject) => {
    this.props.dispatch({
      type: 'SIGNUP_FORM_SUBMIT',
      payload: { values, resolve, reject }
    })
  })

  render() {
    const { t } = this.props
    
    return (
      <Form className="form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Columns className="columns">
          <div className="column">
            <Field
              name="firstName"
              icon="user"
              placeholder={t('first_name')}
              type="text"
              component={this.renderInput}
            />
          </div>
          <div className="column">
            <Field
              name="lastName"
              icon="user"
              placeholder={t('last_name')}
              type="text"
              component={this.renderInput}
            />
          </div>
        </Columns>
        <Columns className="columns">
          <div className="column is-half">
            <Field
              name="username"
              icon="user"
              placeholder={t('username')}
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
                  placeholder={t('birth_date_placeholder')}
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
              placeholder={t('password')}
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

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  submitting: PropTypes.bool,
  t: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default compose(
  connect(),
  reduxForm({
    form: 'signUp',
    validate
  })
)(translate()(withTheme()(SignUpForm)))