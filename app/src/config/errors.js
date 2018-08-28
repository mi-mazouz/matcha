const errors = {
  INVALID_EMAIL_OR_PASSWORD: 'INVALID_EMAIL_OR_PASSWORD',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  BAD_TOKEN: 'BAD_TOKEN'
}

export default errorFromApi => {
  switch (errorFromApi) {
    case errors.INVALID_EMAIL_OR_PASSWORD:
      return 'email_or_password_invalid'
    case errors.EMAIL_ALREADY_EXISTS:
      return 'email_already_used'
    case errors.TOKEN_EXPIRED:
      return 'token_expired'
    case errors.BAD_TOKEN:
      return 'bad_token'
    default:
      return 'an_error_occured'
  }
}
