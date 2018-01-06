import { connect } from 'react-redux'

import { saveProfilePicture, getProfilePicture } from '../actions'
import Layout from '../components/profile'

export default connect(
  (state) => ({
    profilePicture: state.profile.profilePicture
  }),
  {
    saveProfilePicture,
    getProfilePicture
  }
)(Layout)
