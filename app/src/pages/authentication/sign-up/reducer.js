import { SIGNUP_FORM_ERROR } from './constants'

export default (state, { type, payload }) => {
  switch (type) {
    case SIGNUP_FORM_ERROR:
      return {
        ...state,
        submitting: false,
        syncErrors: {
          email: payload.error === 'email_already_used' && payload.error
        }
      }
    default:
      return state
  }
}
