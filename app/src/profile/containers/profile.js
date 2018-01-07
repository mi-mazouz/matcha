import { connect } from 'react-redux'

import { saveProfilePicture, getUser, updateUser } from '../actions'
import LayoutComponent from '../components/profile'
import BasicPage from '../../hocs/components/basic-page'

const Layout = connect(
  (state) => ({
    user: state.user
  }),
  {
    saveProfilePicture,
    updateUser,
    getUser
  }
)(LayoutComponent)

export default BasicPage(Layout)
