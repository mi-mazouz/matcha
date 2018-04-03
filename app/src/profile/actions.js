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
    const pictureProfile = json.data

    dispatch({
      type: constants.PROFILE_PICTURE_SUCCESS,
      payload: pictureProfile
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.PROFILE_PICTURE_FAILURE,
      payload: error.response.data.message
    })
  })
}

const savePictures = (pictures) => dispatch => {
  dispatch({
    type: constants.PICTURES_REQUEST
  })

  axios({
    method: 'post',
    url: config.API_BASE_URI + '/picture/save',
    data: { pictures }
  })
  .then((json) => {
    const pictures = json.data

    dispatch({
      type: constants.PICTURES_SUCCESS,
      payload: pictures
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.PICTURES_FAILURE,
      payload: error.response.data.message
    })
  })
}

const removePicture = (picture) => dispatch => {
  dispatch({
    type: constants.PICTURE_REMOVE_REQUEST
  })

  axios({
    method: 'delete',
    url: config.API_BASE_URI + '/picture/remove',
    data: { picture }
  })
  .then((json) => {
    const pictures = json.data

    dispatch({
      type: constants.PICTURE_REMOVE_SUCCESS,
      payload: pictures
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.PICTURE_REMOVE_FAILURE,
      payload: error.response.data.message
    })
  })
}

const getUserInfos = () => dispatch => {
  dispatch({
    type: constants.GET_USER_INFOS_REQUEST
  })

  axios({
    method: 'get',
    url: config.API_BASE_URI + '/user/get-infos'
  })
  .then((json) => {
    const user = json.data

    dispatch({
      type: constants.GET_USER_INFOS_SUCCESS,
      payload: user
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.GET_USER_INFOS_FAILURE,
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
    const user = json.data

    dispatch({
      type: constants.UPDATE_USER_SUCCESS,
      payload: user
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.UPDATE_USER_FAILURE,
      payload: error.response.data.message
    })
  })
}

const postLocation = () => dispatch => {
  dispatch({
    type: constants.POST_LOCATION_REQUEST
  })

  axios({
    method: 'post',
    url: config.API_BASE_URI + '/location/post-location'
  })
  .then((json) => {
    dispatch({
      type: constants.POST_LOCATION_SUCCESS,
      payload: json.data.location
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.POST_LOCATION_FAILURE,
      payload: error.response.data.message
    })
  })
}

export {
 saveProfilePicture,
 removePicture,
 savePictures,
 updateUser,
 postLocation,
 getUserInfos
}
