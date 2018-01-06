import { connect } from 'react-redux'
import { signup } from '../actions'

import Layout from '../components/signup'

export default connect(
  (state) => ({
    isAuthenticating: state.signup.isAuthenticating,
    error: state.signup.error
  }),
  { signup }
)(Layout)
