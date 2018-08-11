import { SIGNUP_FORM_ERROR } from './constants'

export default (state, { type, payload }) => {
  switch (type) {
    case SIGNUP_FORM_ERROR:
      return {
        ...state,
        submitting: false,
        syncErrors: {
          email: payload.error === 'Email already use' && 'Email already use'
        }
      }
    default:
      return state
  }
}