import { connect } from 'react-redux'

import {
  saveProfilePicture,
  savePictures,
  getUserInfos,
  updateUser,
  postLocation,
  removePicture
} from '../actions'
import LayoutComponent from '../components/profile'
import BasicPage from '../../hocs/components/basic-page'

const Layout = connect(
  (state) => ({
    user: state.user
  }),
  {
    saveProfilePicture,
    savePictures,
    removePicture,
    postLocation,
    updateUser,
    getUserInfos
  }
)(LayoutComponent)

export default BasicPage(Layout)
