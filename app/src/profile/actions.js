import axios from 'axios'

import * as constants from './constants'
import config from '../config'

const saveProfilePicture = (photo) => dispatch => {
  dispatch({
    type: constants.SAVE_PROFILE_PICTURE_REQUEST
  })

  axios({
    method: 'post',
    url: config.API_BASE_URI + '/photo/save-profile',
    data: { photo }
  })
  .then((json) => {
    dispatch({
      type: constants.SAVE_PROFILE_PICTURE_SUCCESS
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.SAVE_PROFILE_PICTURE_FAILURE,
      payload: error.response.data.message
    })
  })
}

export {
 saveProfilePicture
}
