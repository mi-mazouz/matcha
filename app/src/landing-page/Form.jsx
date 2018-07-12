import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../common/styles/components/button'
import Select from '../common/styles/components/Select'

const Form = styled.form`
  width: 435px;
  margin: auto
`

class LandingPageForm extends Component {
  state = {
    fromValue: 18
  }

  renderSelect = ({ input, ...rest }) => (
    <Select input={input}>
      { rest.children }
    </Select>
  )

  handleFromChange = (_, value) => this.setState({ fromValue: parseInt(value, 10) })

  handleSubmit = (values) => {console.log(values)}

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className="columns">
          <div className="column">
            <Field name="iAm" component={this.renderSelect}>
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
        </div>
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column">
                <Field onChange={this.handleFromChange} name="from" component={this.renderSelect}>
                  <option value="" disabled>From</option>
                  {Array(63).fill(null).map((_, index) => <option key={index}>{index + 18}</option>)}
                </Field>
              </div>
              <div className="column">
                <Field name="to" component={this.renderSelect}>
                  <option value="" disabled>To</option>
                  {Array(63 - (this.state.fromValue - 18)).fill(null).map((_, index) => <option key={index}>{index + this.state.fromValue}</option>)}
                </Field>
              </div>
            </div>
          </div>
          <div className="column">
            <Field name="distance" component={this.renderSelect}>
              <option value="" disabled>Distance</option>
              {Array(10).fill(null).map((_, index) => <option key={index}>{index * 5} Km</option>)}
            </Field>
          </div>
        </div>
        <Button
          backgroundImage={this.props.theme.palette.mixGradient}
          type="submit"
          isLoading={this.props.submitting}
          isDisabled={this.props.submitting}
        >
          Submit
        </Button>
      </Form>
    )
  }
}

LandingPageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: 'landingPage'
})(withTheme()(LandingPageForm))
