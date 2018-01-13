import * as constants from './constants'

const initialUserState = {
  profilePicture: null,
  pictures: Array(4).fill(null),
  mail: null,
  firstName: null,
  lastName: null,
  gender: null,
  bio: null,
  isFetching: false,
  error: null
}

const UserReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case constants.PROFILE_PICTURE_REQUEST:
    case constants.GET_USER_REQUEST:
    case constants.UPDATE_USER_REQUEST:
      return { ...state, isFetching: true }
    case constants.PROFILE_PICTURE_FAILURE:
    case constants.GET_USER_FAILURE:
    case constants.UPDATE_USER_FAILURE:
      return { ...state, isFetching: false, error: payload }
    case constants.PROFILE_PICTURE_SUCCESS:
    case constants.GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        profilePicture: payload.profilePicture,
        mail: payload.mail,
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        bio: payload.bio
      }
    case constants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        mail: payload.mail,
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        bio: payload.bio
      }
    default:
      return state
  }
}

export {
 UserReducer
}
