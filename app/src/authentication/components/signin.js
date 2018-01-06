import React from 'react'

import { TextField } from '../../styles/components/fileds'
import { SecondaryLink, TertiaryLink } from '../../styles/components/links'
import { Button } from '../../styles/components/buttons'
import { Form } from '../../styles/components/forms'
import { Error } from '../../styles/components/error'
import {
  CardContainer,
  CardHeader,
  CardText
} from '../../styles/components/cards'

class Signin extends React.Component {
  state = {
    canSubmit: false
  }

  handleSubmit (values) {
    this.props.signin(
      values.mail,
      values.password
    )
  }
  enableButton () { this.setState({ canSubmit: true }) }
  disableButton () { this.setState({ canSubmit: false }) }


  render () {
    const { isAuthenticating, error } = this.props

    return (
      <CardContainer>
        <CardHeader
          title='SIGN IN'
          style={{
            padding: '0px'
          }}
        />
        <Form
          onValid={() => this.enableButton()}
          onInvalid={() => this.disableButton()}
          onSubmit={(values) => this.handleSubmit(values)}
        >
          <CardText>
            <TextField
              name='mail'
              validations='isEmail'
              validationError='Wrong email'
              hintText='Email'
              type='email'
              required
            />
            <TextField
              name='password'
              validations='minLength:8'
              validationError='Wrong password'
              hintText='Password'
              type='password'
              required
            />
            <TertiaryLink
              to='/reset-password'
              label='Forgot password?'
              style={{
                float: 'right'
              }}
            />
          </CardText>
          <Error style={{marginTop: 0}} errorMessage={error} />
          <Button
            type='submit'
            label='Submit'
            disabled={!this.state.canSubmit || isAuthenticating}
          />
        </Form>
        <SecondaryLink
          to='/signup'
          label='Not registered?'
        />
      </CardContainer>
    )
  }
}

export default Signin
