import axios from 'axios'

import * as constants from './constants'
import config from '../config'

const saveProfilePicture = (picture) => dispatch => {
  dispatch({
    type: constants.PROFILE_PICTURE_REQUEST
  })

  axios({
    method: 'post',
    url: config.API_BASE_URI + '/picture/save-profile',
    data: { picture }
  })
  .then((json) => {
    dispatch({
      type: constants.PROFILE_PICTURE_SUCCESS,
      payload: json.data.profilePicture
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.PROFILE_PICTURE_FAILURE,
      payload: error.response.data.message
    })
  })
}

const getProfilePicture = () => dispatch => {
  dispatch({
    type: constants.PROFILE_PICTURE_REQUEST
  })

  axios({
    method: 'post',
    url: config.API_BASE_URI + '/picture/get-profile'
  })
  .then((json) => {
    dispatch({
      type: constants.PROFILE_PICTURE_SUCCESS,
      payload: json.data.profilePicture
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.PROFILE_PICTURE_FAILURE,
      payload: error.response.data.message
    })
  })
}

export {
 saveProfilePicture,
 getProfilePicture
}
