import React, { Component } from 'react'
import { compose } from 'redux'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../../global/components/Button'
import Select from '../../global/components/Select'
import Paper from '../../global/components/Paper'
import Tag from '../../global/components/Tag'
import { Input } from '../../global/components/Input'
import { LANDING_PAGE_FORM_SUBMIT } from './constants'

const Form = styled.form`
  width: 435px;
  margin: auto;
`

const PaperTag = styled(Paper)`
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  ${props => !props.isfirst && 'box-shadow: unset !important;'} opacity: 0.8;
  height: 36px;
  padding: 5px;
`

const LandingPageTag = styled(Tag)`
  margin-bottom: 0px !important;
  flex-wrap: unset !important;
  &:not(:last-child) {
    margin-right: 10px;
  }
  & > span {
    margin-bottom: 0px !important;
  }
`

const PaperPlaceHolder = styled.div`
  width: 100%;
`

const Columns = styled.div`
  display: flex !important;
`

class LandingPageForm extends Component {
  state = {
    fromValue: 18,
    tags: [],
    tag: ''
  }

  renderSelect = ({ input, children }) => <Select {...input}>{children}</Select>

  handleFromChange = (_, value) => this.setState({ fromValue: parseInt(value, 10) })

  handleSubmit = values =>
    new Promise((resolve, reject) => {
      values.tags = [...this.state.tags]
      this.props.dispatch({
        type: LANDING_PAGE_FORM_SUBMIT,
        payload: { values, resolve, reject }
      })
    })

  handleTagDelete = index =>
    this.setState({ tags: [...this.state.tags].filter((_, i) => index !== i) })

  handleTag = event => this.setState({ tag: '#' + event.target.value })

  handleTags = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const tags = [...this.state.tags]

      tags.unshift(this.state.tag)
      this.setState({ tags })
      event.target.value = null
    }
  }

  render() {
    const { t, submitting, theme } = this.props

    return (
      <Form className="form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Columns className="columns">
          <div className="column">
            <Field name="gender" component={this.renderSelect}>
              <option value="" disabled>
                {t('i_am')}
              </option>
              <option>{t('woman')}</option>
              <option>{t('man')}</option>
            </Field>
          </div>
          <div className="column">
            <Field name="lookingFor" component={this.renderSelect}>
              <option value="" disabled>
                {t('looking_for')}
              </option>
              <option>{t('woman')}</option>
              <option>{t('man')}</option>
            </Field>
          </div>
        </Columns>
        <Columns className="columns">
          <div className="column">
            <Columns className="columns">
              <div className="column">
                <Field onChange={this.handleFromChange} name="from" component={this.renderSelect}>
                  <option value="" disabled>
                    {t('from')}
                  </option>
                  {Array(63)
                    .fill(null)
                    .map((_, index) => (
                      <option key={index}>{index + 18}</option>
                    ))}
                </Field>
              </div>
              <div className="column">
                <Field name="to" component={this.renderSelect}>
                  <option value="" disabled>
                    {t('to')}
                  </option>
                  {Array(63 - (this.state.fromValue - 18))
                    .fill(null)
                    .map((_, index) => (
                      <option key={index}>{index + this.state.fromValue}</option>
                    ))}
                </Field>
              </div>
            </Columns>
          </div>
          <div className="column">
            <Field name="distance" component={this.renderSelect}>
              <option value="" disabled>
                Distance
              </option>
              {Array(10)
                .fill(null)
                .map((_, index) => (
                  <option key={index}>{index * 5} Km</option>
                ))}
            </Field>
          </div>
        </Columns>
        <Columns className="columns">
          <div className="column">
            <Input
              type="text"
              placeholder={`#${t('interests')}`}
              onChange={this.handleTag}
              onKeyPress={this.handleTags}
            />
          </div>
          <div className="column is-half">
            <PaperTag isfirst={1}>
              <PaperTag>
                {this.state.tags.length === 0 ? (
                  <PaperPlaceHolder className="has-text-centered">
                    {t('my_interests')}
                  </PaperPlaceHolder>
                ) : (
                  this.state.tags.map((value, index) => (
                    <LandingPageTag
                      size="is-small"
                      key={index}
                      onDelete={() => this.handleTagDelete(index)}
                    >
                      {value}
                    </LandingPageTag>
                  ))
                )}
              </PaperTag>
            </PaperTag>
          </div>
        </Columns>
        <Button
          backgroundImage={theme.palette.mixGradient}
          type="submit"
          isLoading={submitting}
          isDisabled={submitting}
        >
          Find!
        </Button>
      </Form>
    )
  }
}

LandingPageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default compose(
  connect(),
  reduxForm({
    form: 'landingPage'
  })
)(translate()(withTheme()(LandingPageForm)))
