import { SIGNIN_FORM_ERROR } from './constants'

export default (state, { type, payload }) => {
  switch (type) {
    case SIGNIN_FORM_ERROR:
      return {
        ...state,
        submitting: false,
        globalError: payload.error,
        syncErrors: {
          email: true,
          password: true
        }
      }
    default:
      return state
  }
}