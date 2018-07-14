import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../../../common/components/Button'
import { InputWithIcons } from '../../../common/components/Input'

const Form = styled.form`
  width: 300px;
  margin: auto
`

const validate = (values) => {
  const errors = {}

  if (!values.username) errors.username = 'Required'
  if (!values.password) errors.password = 'Required'
  
  return errors
}

class LandingPageForm extends Component {
  renderInput = ({ input, meta, icon, placeholder }) => {
    const error = meta.error && meta.touched && !meta.active
    const isValid = !meta.error && meta.touched && !meta.active
    
    return (
      <InputWithIcons
        {...input}
        inputIcon={icon}
        error={error}
        isValid={isValid}
        placeholder={error ? meta.error : placeholder}
      />
    )
  }

  handleSubmit = (values) => new Promise((resolve, reject) => {
    this.props.dispatch({
      // type: LANDING_PAGE_FORM_SUBMIT,
      payload: { values, resolve, reject }
    })
  })

  render() {
    return (
      <Form className="form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className="columns">
          <div className="column">
            <Field
              name="username"
              icon="user"
              placeholder='Username'
              type="text"
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

LandingPageForm.propTypes = {
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
)(withTheme()(LandingPageForm))