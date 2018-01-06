import { connect } from 'react-redux'
import { resetPassword } from '../actions'

import Layout from '../components/reset-password'

export default connect(
  (state) => ({
    isAuthenticating: state.resetPassword.isFetching,
    error: state.resetPassword.error
  }),
  { resetPassword }
)(Layout)
