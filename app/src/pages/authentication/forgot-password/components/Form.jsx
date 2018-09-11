import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { translate } from 'react-i18next'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../../../../global/components/Button'
import { InputWithIconsAndError } from '../../../../global/components/Input'
import { FORGOT_PASSWORD_FORM_SUBMIT } from '../constants'
import { isEmail } from '../../../../tools'

const Form = styled.form`
  width: 300px;
  margin: auto;
`

const validate = values => {
  const errors = {}

  if (!values.email) errors.email = 'Required'
  else if (!isEmail(values.email)) errors.email = 'Wrong format'

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
        type: FORGOT_PASSWORD_FORM_SUBMIT,
        payload: { values, resolve }
      })
    )

  render() {
    const { t, theme, submitting, handleSubmit } = this.props

    return (
      <Form className="form" onSubmit={handleSubmit(this.handleSubmit)}>
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
        <Button
          backgroundImage={theme.palette.mixGradient}
          type="submit"
          isLoading={submitting}
          isDisabled={submitting}
        >
          {t('send')}
        </Button>
      </Form>
    )
  }
}

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'forgotPassword',
  validate
})(translate()(withTheme()(ForgotPasswordForm)))
