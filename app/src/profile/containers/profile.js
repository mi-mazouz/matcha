import { connect } from 'react-redux'

import { saveProfilePicture, getProfilePicture } from '../actions'
import LayoutComponent from '../components/profile'
import Menu from '../../hocs/components/menu'

const Layout = connect(
  (state) => ({
    profilePicture: state.profile.profilePicture
  }),
  {
    saveProfilePicture,
    getProfilePicture
  }
)(LayoutComponent)

export default Menu(Layout)
