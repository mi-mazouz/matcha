export const errors = {
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  EMAIL_MISSING: 'EMAIL_MISSING',
  INVALID_EMAIL_OR_PASSWORD: 'INVALID_EMAIL_OR_PASSWORD',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  BAD_TOKEN: 'BAD_TOKEN',
  USER_INACTIVE: 'USER_INACTIVE'
}

export default errorFromApi => {
  switch (errorFromApi) {
    case errors.INVALID_EMAIL_OR_PASSWORD:
      return 'email_or_password_invalid'
    case errors.EMAIL_MISSING:
      return 'email_invalid'
    case errors.EMAIL_ALREADY_EXISTS:
      return 'email_already_used'
    case errors.TOKEN_EXPIRED:
      return 'token_expired'
    case errors.BAD_TOKEN:
      return 'bad_token'
    case errors.USER_INACTIVE:
      return 'user_inactive'
    default:
      return 'an_error_occured'
  }
}
