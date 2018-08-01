import { SIGNUP_FORM_ERROR } from './constants'

export default (state, { type, payload }) => {
  switch (type) {
    case SIGNUP_FORM_ERROR:
      return {
        ...state,
        submitting: false,
        syncErrors: {
          username: payload.error,
          birthDate: payload.error,
          sexualOrientation: payload.error,
          gender: payload.error,
          email: payload.error,
          password: payload.error
        }
      }
    default:
      return state
  }
}