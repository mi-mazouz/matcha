import { connect } from 'react-redux'
import { signin } from '../actions'

import Layout from '../components/signin'

export default connect(
  (state) => ({
    isAuthenticating: state.signin.isAuthenticating,
    error: state.signin.error
  }),
  { signin }
)(Layout)
