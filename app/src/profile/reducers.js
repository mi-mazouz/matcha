import * as constants from './constants'

const initialProfileState = {
  profilePicture: null,
  isFetching: false,
  error: null
}

const ProfileReducer = (state = initialProfileState, { type, payload }) => {
  switch (type) {
    case constants.SAVE_PROFILE_PICTURE_REQUEST:
      return { ...state, isFetching: true }
    case constants.SAVE_PROFILE_PICTURE_FAILURE:
      return { ...state, isFetching: false, error: payload }
    case constants.SAVE_PROFILE_PICTURE_SUCCESS:
      return { ...state, isFetching: false, error: null, profilePicture: payload }
    default:
      return state
  }
}

export {
 ProfileReducer
}
