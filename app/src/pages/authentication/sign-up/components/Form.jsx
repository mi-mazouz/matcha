import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { reduxForm, Field } from 'redux-form'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../../../../global/components/Button'
import Form from '../../../../global/components/Form'
import { isName, isEmail, isPassword, isUsername } from '../../../../tools'
import { isBirthDate } from '../../../../tools/dates'
import { InputWithIconsAndError } from '../../../../global/components/Input'
import { SIGNUP_FORM_SUBMIT } from '../constants'

const StyledForm = styled(Form)`
  width: 435px;
`
const Columns = styled.div`
  display: flex !important;
`
const validate = values => {
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
  else if (!isPassword(values.password)) {
    errors.password =
      'Your password must contain at least 8 characters, 1 capital letter and 1 number'
  }

  return errors
}

class SignUpForm extends Component {
  renderInput = ({ input, meta, ...props }) => {
    const isError = (meta.error && meta.touched && !meta.active) || false
    const isValid = !meta.error && meta.touched && !meta.active

    return (
      <InputWithIconsAndError
        {...input}
        {...props}
        isError={isError}
        onKeyUp={event => {
          if (event.key === 'Enter') document.getElementsByName(input.name)[0].blur()
        }}
        isValid={isValid}
        errorText={isError ? this.props.t(meta.error) : ''}
      />
    )
  }

  handleSubmit = values =>
    new Promise(resolve => {
      this.props.dispatch({
        type: SIGNUP_FORM_SUBMIT,
        payload: { values, resolve }
      })
    })

  render() {
    const { t, theme, submitting } = this.props

    return (
      <StyledForm onSubmit={this.props.handleSubmit(this.handleSubmit)}>
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
              placeholder="Email"
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
          backgroundImage={theme.palette.mixGradient}
          type="submit"
          isLoading={submitting}
          isDisabled={submitting}
        >
          {t('sign_up')}
        </Button>
      </StyledForm>
    )
  }
}

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
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
