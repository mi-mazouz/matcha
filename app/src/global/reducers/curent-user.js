import { SIGNIN_FORM_SUCCESS } from '../../pages/authentication/sign-in/constants'
import { SIGNUP_FORM_SUCCESS } from '../../pages/authentication/sign-up/constants'
import { GET_CURRENT_USER_SUCCESS } from '../../Layouts/logged/constants'

const initialState = {
  id: null,
  email: null,
  firstName: null,
  lastName: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNIN_FORM_SUCCESS:
    case SIGNUP_FORM_SUCCESS:
      return { ...state, id: payload }
    case GET_CURRENT_USER_SUCCESS:
      return payload
    default:
      return state
  }
}
