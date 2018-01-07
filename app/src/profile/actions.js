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
      payload: { profilePicture: json.data.profilePicture }
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.PROFILE_PICTURE_FAILURE,
      payload: error.response.data.message
    })
  })
}

const getUser = () => dispatch => {
  dispatch({
    type: constants.GET_USER_REQUEST
  })

  axios({
    method: 'get',
    url: config.API_BASE_URI + '/user/get-infos'
  })
  .then((json) => {
    dispatch({
      type: constants.GET_USER_SUCCESS,
      payload: {
        profilePicture: json.data.profilePicture,
        mail: json.data.mail,
        firstName: json.data.firstName,
        lastName: json.data.lastName
      }
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.GET_USER_FAILURE,
      payload: error.response.data.message
    })
  })
}

const updateUser = (dataToUpdate) => dispatch => {
  dispatch({
    type: constants.UPDATE_USER_REQUEST
  })

  axios({
    method: 'patch',
    url: config.API_BASE_URI + '/user/update-infos',
    data: dataToUpdate
  })
  .then((json) => {
    dispatch({
      type: constants.UPDATE_USER_SUCCESS,
      payload: {
        mail: json.data.mail,
        firstName: json.data.firstName,
        lastName: json.data.lastName
      }
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.UPDATE_USER_FAILURE,
      payload: error.response.data.message
    })
  })
}

export {
 saveProfilePicture,
 updateUser,
 getUser
}
