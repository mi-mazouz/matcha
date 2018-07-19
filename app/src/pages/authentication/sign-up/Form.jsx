import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../../../common/components/Button'
import { Input } from '../../../common/components/Input'
import Paper from '../../../common/components/Paper'
import Tag from '../../../common/components/Tag'

const Form = styled.form`
  width: 435px;
  margin: auto
`
const Columns = styled.div`
  display: flex !important;
`
const PaperPlaceHolder = styled.div`
  width: 100%;
`

const PaperTag = styled(Paper)`
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  opacity: 0.8;
  height: 36px;
  padding: 5px;
`

const SignUpPageTag = styled(Tag)`
  margin-bottom: 0px !important;
  flex-wrap: unset !important;
  &:not(:last-child) {
    margin-right: 10px;
  & > span {
    margin-bottom: 0px !important;
  }`

const TagsColumn = styled.div`
  overflow: scroll;
`
const validate = (values) => {
  const errors = {}

  if (!values.email) errors.email = 'Required'
  if (!values.password) errors.password = 'Required'
  
  return errors
}

class SignUpFormPage extends Component {
  state = {
    tags: [],
    tag: ''
  }
  
  renderInput = ({ input, meta, placeholder, ...props }) => {
    const error = (meta.error && meta.touched && !meta.active) || false
    const isValid = !meta.error && meta.touched && !meta.active
    
    return (
      <Input
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
      // type: LANDING_PAGE_FORM_SUBMIT,
      payload: { values, resolve, reject }
    })
  })

  render() {
    return (
      <Form className="form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Columns className="columns">
          <div className="column">
            <Field
              name="email"
              icon="user"
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
        <Columns className="columns">
          <div className="column">
            <Field
              name="username"
              icon="user"
              placeholder='Username'
              type="text"
              component={this.renderInput}
            />
          </div>
          <div className="column">
            <Field
              name="sex"
              icon="lock"
              placeholder='Sex'
              type="password"
              component={this.renderInput}
            />
          </div>
        </Columns>
        <Columns className="columns">
          <div className="column">
            <Field
              name="firstname"
              icon="user"
              placeholder='Firstname'
              type="text"
              component={this.renderInput}
            />
          </div>
          <div className="column">
            <Field
              name="lastname"
              icon="lock"
              placeholder='Lastname'
              type="text"
              component={this.renderInput}
            />
          </div>
        </Columns>
        <Columns className="columns">
          <div className="column">
            <Input
              type="text"
              placeholder="#Interests"
              onChange={this.handleTag}
              onKeyPress={this.handleTags}
            />
          </div>
          <TagsColumn className="column is-half">
            <PaperTag>
              {
                this.state.tags.length === 0 ?
                  <PaperPlaceHolder className="has-text-centered">
                    My interests
                  </PaperPlaceHolder> : 
                  this.state.tags.map((value, index) => (
                    <SignUpPageTag
                      size="is-small"
                      key={index}
                      onDelete={() => this.handleTagDelete(index)}
                    >
                      { value }
                    </SignUpPageTag>
                  ))
              }
            </PaperTag>
          </TagsColumn>
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
    form: 'signInPage',
    validate
  })
)(withTheme()(SignUpFormPage))