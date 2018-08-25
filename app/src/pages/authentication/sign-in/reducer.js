import { SIGNIN_FORM_ERROR } from './constants'

export default (state, { type, payload }) => {
  switch (type) {
    case SIGNIN_FORM_ERROR:
      return {
        ...state,
        submitting: false,
        syncErrors: {
          ...state.syncErrors,
          password: payload.error
        }
      }
    default:
      return state
  }
}
