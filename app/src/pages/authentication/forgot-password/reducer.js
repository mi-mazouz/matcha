import { FORGOT_PASSWORD_FORM_ERROR } from './constants'

export default (state, { type, payload }) => {
  switch (type) {
    case FORGOT_PASSWORD_FORM_ERROR:
      return {
        ...state,
        submitting: false,
        syncErrors: {
          ...state.syncErrors,
          email: payload.error
        }
      }
    default:
      return state
  }
}
