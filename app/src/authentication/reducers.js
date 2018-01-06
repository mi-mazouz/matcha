import * as constants from './constants'

const initialSignupState = {
  isAuthenticating: false,
  error: null
}

const SignupReducer = (state = initialSignupState, { type, payload }) => {
  switch (type) {
    case constants.SIGNUP_REQUEST:
      return { ...state, isAuthenticating: true }
    case constants.SIGNUP_FAILURE:
      return { ...state, isAuthenticating: false, error: payload }
    case constants.SIGNUP_SUCCESS:
      return { ...state, isAuthenticating: false, error: null }
    default:
      return state
  }
}

const initialSigninState = {
  isAuthenticating: false,
  error: null
}

const SigninReducer = (state = initialSigninState, { type, payload }) => {
  switch (type) {
    case constants.SIGNIN_REQUEST:
      return { ...state, isAuthenticating: true }
    case constants.SIGNIN_FAILURE:
      return { ...state, isAuthenticating: false, error: payload }
    case constants.SIGNIN_SUCCESS:
      return { ...state, isAuthenticating: false, error: null }
    default:
      return state
  }
}

const initialResetPasswordState = {
  isFetching: false,
  error: null
}

const ResetPasswordReducer = (state = initialResetPasswordState, { type, payload }) => {
  switch (type) {
    case constants.RESET_PASSWORD_REQUEST:
      return { ...state, isFetching: true }
    case constants.RESET_PASSWORD_FAILURE:
      return { ...state, isFetching: false, error: payload }
    case constants.RESET_PASSWORD_SUCCESS:
      return { ...state, isFetching: false, error: null }
    default:
      return state
  }
}

export {
  SignupReducer,
  SigninReducer,
  ResetPasswordReducer
}
