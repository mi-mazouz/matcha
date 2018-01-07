import { connect } from 'react-redux'

import { saveProfilePicture, getProfilePicture } from '../actions'
import LayoutComponent from '../components/profile'
import BasicPage from '../../hocs/components/basic-page'

const Layout = connect(
  (state) => ({
    profilePicture: state.profile.profilePicture
  }),
  {
    saveProfilePicture,
    getProfilePicture
  }
)(LayoutComponent)

export default BasicPage(Layout)
