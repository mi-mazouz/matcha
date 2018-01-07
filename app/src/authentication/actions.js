import axios from 'axios'

import * as constants from './constants'
import config from '../config'
import history from '../config/history'
import { setToken } from '../utils'

const signup = (firstName, lastName, userName, mail, password) => dispatch => {
  dispatch({
    type: constants.SIGNUP_REQUEST
  })

  axios({
    method: 'post',
    url: config.API_BASE_URI + '/signup',
    data: { firstName, lastName, userName, mail, password }
  })
  .then((json) => {
    setToken(json.data.token)

    dispatch({
      type: constants.SIGNUP_SUCCESS
    })

    return history.push('/profil')
  })
  .catch((error) => {
    dispatch({
      type: constants.SIGNUP_FAILURE,
      payload: error.response.data.message
    })
  })
}

const signin = (mail, password) => dispatch => {
  dispatch({
    type: constants.SIGNIN_REQUEST
  })

  axios({
    method: 'post',
    url: config.API_BASE_URI + '/signin',
    data: { mail, password }
  })
  .then((json) => {
    setToken(json.data.token)

    dispatch({
      type: constants.SIGNIN_SUCCESS
    })

    return history.push('/profil')
  })
  .catch((error) => {
    dispatch({
      type: constants.SIGNIN_FAILURE,
      payload: error.response.data.message
    })
  })
}

const resetPassword = (mail) => dispatch => {
  dispatch({
    type: constants.RESET_PASSWORD_REQUEST
  })

  axios({
    method: 'post',
    url: config.API_BASE_URI + '/reset-password',
    data: { mail }
  })
  .then((json) => {
    dispatch({
      type: constants.RESET_PASSWORD_SUCCESS
    })

    return history.push('/profil')
  })
  .catch((error) => {
    dispatch({
      type: constants.RESET_PASSWORD_FAILURE,
      payload: error.response.data.message
    })
  })
}

export {
  signup,
  signin,
  resetPassword
}
