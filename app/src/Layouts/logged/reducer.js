import { GET_CURRENT_USER_SUCCESS } from './constants'

const initialState = {
  id: null,
  username: null,
  email: null,
  emailConfirmed: null,
  firstName: null,
  lastName: null,
  gender: null,
  birthdate: null,
  sexualOrientation: null,
  pictures: [],
  profilePicture: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_USER_SUCCESS:
      return payload
    default:
      return state
  }
}
