import * as constants from './constants'

const initialUserState = {
  profilePicture: null,
  pictures: null,
  mail: null,
  location: null,
  profileScore: null,
  like: null,
  firstName: null,
  lastName: null,
  gender: null,
  interestedIn: null,
  bio: null,
  isFetching: false,
  error: null
}

const UserReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case constants.PROFILE_PICTURE_REQUEST:
    case constants.PICTURES_REQUEST:
    case constants.PICTURE_DELETE_REQUEST:
    case constants.GET_USER_INFOS_REQUEST:
    case constants.UPDATE_USER_REQUEST:
      return { ...state, isFetching: true }
    case constants.PROFILE_PICTURE_FAILURE:
    case constants.PICTURES_FAILURE:
    case constants.PICTURE_DELETE_FAILURE:
    case constants.GET_USER_INFOS_FAILURE:
    case constants.UPDATE_USER_FAILURE:
      return { ...state, isFetching: false, error: payload }
    case constants.PROFILE_PICTURE_SUCCESS:
      return { ...state, isFetching: false, error: null, profilePicture: payload }
    case constants.PICTURES_SUCCESS:
    case constants.PICTURE_DELETE_SUCCESS:
      return { ...state, isFetching: false, error: null, pictures: payload }
    case constants.GET_USER_INFOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        profilePicture: payload.profilePicture,
        pictures: payload.pictures,
        mail: payload.mail,
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        interestedIn: payload.interestedIn,
        hobbies: payload.hobbies,
        like: payload.like,
        location: payload.location,
        profileScore: payload.profileScore,
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
        interestedIn: payload.interestedIn,
        hobbies: payload.hobbies,
        like: payload.like,
        location: payload.location,
        profileScore: payload.profileScore,
        bio: payload.bio
      }
    default:
      return state
  }
}

export {
 UserReducer
}
