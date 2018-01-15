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
    dispatch({
      type: constants.PICTURES_SUCCESS,
      payload: json.data.pictures
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
    type: constants.PICTURE_DELETE_REQUEST
  })

  axios({
    method: 'delete',
    url: config.API_BASE_URI + '/picture/delete',
    data: { picture }
  })
  .then((json) => {
    dispatch({
      type: constants.PICTURE_DELETE_SUCCESS,
      payload: json.data.pictures
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.PICTURE_DELETE_FAILURE,
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
    dispatch({
      type: constants.GET_USER_INFOS_SUCCESS,
      payload: {
        profilePicture: json.data.profilePicture,
        pictures: json.data.pictures,
        mail: json.data.mail,
        firstName: json.data.firstName,
        lastName: json.data.lastName,
        gender: json.data.gender,
        interestedIn: json.data.interestedIn,
        hobbies: json.data.hobbies,
        profileScore: json.data.profileScore,
        location: json.data.location,
        like: json.data.like,
        bio: json.data.bio
      }
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
    dispatch({
      type: constants.UPDATE_USER_SUCCESS,
      payload: {
        mail: json.data.updatedUser.mail,
        firstName: json.data.updatedUser.firstName,
        lastName: json.data.updatedUser.lastName,
        gender: json.data.updatedUser.gender,
        interestedIn: json.data.updatedUser.interestedIn,
        profileScore: json.data.updatedUser.profileScore,
        like: json.data.updatedUser.like,
        hobbies: json.data.updatedUser.hobbies,
        location: json.data.updatedUser.location,
        bio: json.data.updatedUser.bio
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
 removePicture,
 savePictures,
 updateUser,
 getUserInfos
}
