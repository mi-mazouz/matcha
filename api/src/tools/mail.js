const sgMail = require('@sendgrid/mail')

const config = require('../config')
const logger = require('../config/logger')

const sendConfirmEmail = (userData, token) => {
  sgMail.setApiKey(config.SENDGRID_API_KEY)
  sgMail.setSubstitutionWrappers('{{', '}}')

  const msg = {
    to: userData.email,
    from: 'staff@matcha.com',
    subject: 'Confirm your email',
    templateId: config.EMAIL_TEMPLATES[userData.language].CONFIRM_EMAIL_ID,
    dynamicTemplateData: {
      firstName: userData.firstName,
      confirmLink: `${config.APP_END_POINT}/confirm-email/${token}`
    }
  }

  return sgMail
  .send(msg)
  .then(() => {
    logger.info('Confirm email sent successfully')
    return Promise.resolve()
  })
  .catch(error => {
    logger.error(error.message)
    throw error
  })
}

const sendForgotPasswordEmail = (userData, token) => {
  sgMail.setApiKey(config.SENDGRID_API_KEY)
  sgMail.setSubstitutionWrappers('{{', '}}')

  const msg = {
    to: userData.email,
    from: 'staff@matcha.com',
    subject: 'Reset your password',
    templateId: config.EMAIL_TEMPLATES[userData.language].RESET_PASSWORD_EMAIL_ID,
    dynamicTemplateData: {
      firstName: userData.firstName,
      forgotPasswordLink: `${config.APP_END_POINT}/reset-password/${token}`
    }
  }

  return sgMail
  .send(msg)
  .then(() => {
    logger.info('Reset password email sent successfully')
    return Promise.resolve()
  })
  .catch(error => {
    logger.error(error.message)
    throw error
  })
}

module.exports = {
  sendConfirmEmail,
  sendForgotPasswordEmail
}
