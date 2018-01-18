import * as constants from './constants'

const initialUserState = {
  firstname: null,
  lastname: null,
  gender: null,
  profilePicture: null,
  pictures: null,
  mail: null,
  biography: null,
  // location: null,
  // isLocated: null,
  // profileScore: null,
  // like: null,
  // username: null,
  // interestedIn: null,
  isFetching: false,
  error: null
}

const UserReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    // case constants.POST_LOCATION_REQUEST:
    case constants.PROFILE_PICTURE_REQUEST:
    case constants.PICTURES_REQUEST:
    case constants.PICTURE_REMOVE_REQUEST:
    case constants.GET_USER_INFOS_REQUEST:
    case constants.UPDATE_USER_REQUEST:
      return { ...state, isFetching: true }
      // case constants.POST_LOCATION_FAILURE:
    case constants.PROFILE_PICTURE_FAILURE:
    case constants.PICTURES_FAILURE:
    case constants.PICTURE_REMOVE_FAILURE:
    case constants.GET_USER_INFOS_FAILURE:
    case constants.UPDATE_USER_FAILURE:
      return { ...state, isFetching: false, error: payload }
    // case constants.POST_LOCATION_SUCCESS:
    case constants.PICTURES_SUCCESS:
      const pictures = [...state.pictures, ...payload]

      return { ...state, pictures, isFetching: false, error: null }
    case constants.PROFILE_PICTURE_SUCCESS:
    case constants.PICTURE_REMOVE_SUCCESS:
    case constants.GET_USER_INFOS_SUCCESS:
    case constants.UPDATE_USER_SUCCESS:
      return { ...state, ...payload, isFetching: false, error: null }
    default:
      return state
  }
}

export {
 UserReducer
}
