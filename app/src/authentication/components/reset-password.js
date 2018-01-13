import React from 'react'

import { TextField } from '../../styles/components/fileds'
import { SecondaryLink } from '../../styles/components/links'
import { Button } from '../../styles/components/buttons'
import { Error } from '../../styles/components/error'
import { Form } from '../../styles/components/forms'
import {
  CardContainer,
  CardHeader,
  CardText
} from '../../styles/components/cards'

class ForgotPassword extends React.Component {
  state = {
    canSubmit: false
  }

  handleSubmit (values) { this.props.resetPassword(values.mail) }
  enableButton () { this.setState({ canSubmit: true }) }
  disableButton () { this.setState({ canSubmit: false }) }

  render () {
    const { isFetching, error } = this.props

    return (
      <CardContainer
        containerStyle={{width: '100%'}}
      >
        <CardHeader
          title='RESET PASSWORD'
          style={{
            padding: '0px'
          }}
        />
        <Form
          onValid={() => this.enableButton()}
          onInvalid={() => this.disableButton()}
          onSubmit={(values) => this.handleSubmit(values)}
        >
          <CardText
            style={{width: '80%'}}
          >
            <TextField
              maxLength='30'
              name='mail'
              validations='isEmail'
              validationError='Wrong email'
              hintText='Email'
              type='email'
              required
            />
          </CardText>
          <Error style={{marginTop: 0}} errorMessage={error} />
          <Button
            type='submit'
            label='Submit'
            disabled={!this.state.canSubmit || isFetching}
          />
        </Form>
        <SecondaryLink
          to='/signip'
          label='Go back!'
        />
      </CardContainer>
    )
  }
}

export default ForgotPassword
