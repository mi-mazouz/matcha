import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { translate } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../../../../global/components/Button'
import Form from '../../../../global/components/Form'
import { InputWithIconsAndError } from '../../../../global/components/Input'
import { SIGNIN_FORM_SUBMIT } from '../constants'
import { isEmail } from '../../../../tools'

const StyledForm = styled(Form)`
  width: 300px;
`

const Link = withTheme()(styled(RouterLink)`
  float: right;
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.theme.palette.grey};
`)

const validate = values => {
  const errors = {}

  if (!values.email) errors.email = 'Required'
  else if (!isEmail(values.email)) errors.email = 'Wrong format'
  if (!values.password) errors.password = 'Required'

  return errors
}

class SignInForm extends Component {
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
    new Promise(resolve =>
      this.props.dispatch({
        type: SIGNIN_FORM_SUBMIT,
        payload: { values, resolve }
      })
    )

  render() {
    const { t, theme, submitting, handleSubmit } = this.props

    return (
      <StyledForm onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="columns">
          <div className="column">
            <Field
              name="email"
              icon="envelope"
              placeholder="Email"
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
              placeholder={t('password')}
              type="password"
              component={this.renderInput}
            />
            <Link to="/forgot-password">{t('forgot_password_link_title')}</Link>
          </div>
        </div>
        <Button
          backgroundImage={theme.palette.mixGradient}
          type="submit"
          isLoading={submitting}
          isDisabled={submitting}
        >
          {t('sign_in')}
        </Button>
      </StyledForm>
    )
  }
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'signIn',
  validate
})(translate()(withTheme()(SignInForm)))
