import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { translate } from 'react-i18next'
import { withTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../../../../global/components/Button'
import { InputWithIconsAndError } from '../../../../global/components/Input'
import { RESET_PASSWORD_FORM_SUBMIT } from '../constants'

const Form = styled.form`
  width: 300px;
  margin: auto;
`

const validate = values => {
  const errors = {}

  if (!values.password) errors.password = 'Required'

  return errors
}

class ForgotPasswordForm extends Component {
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
        type: RESET_PASSWORD_FORM_SUBMIT,
        payload: { values, resolve, token: this.props.match.params.token }
      })
    )

  render() {
    const { t, theme, submitting, handleSubmit } = this.props

    return (
      <Form className="form" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="columns">
          <div className="column">
            <Field
              icon="lock"
              name="password"
              placeholder={t('password')}
              type="password"
              component={this.renderInput}
            />
          </div>
        </div>
        <Button
          backgroundImage={theme.palette.mixGradient}
          type="submit"
          isLoading={submitting}
          isDisabled={submitting}
        >
          {t('reset')}
        </Button>
      </Form>
    )
  }
}

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'forgotPassword',
  validate
})(translate()(withTheme()(withRouter(ForgotPasswordForm))))
