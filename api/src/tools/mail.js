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
    templateId: config.EMAIL_TEMPLATES['EN'].CONFIRM_EMAIL_ID,
    dynamicTemplateData: {
      firstName: userData.firstName,
      confirmLink: `${config.APP_END_POINT}/confirm-email/${token}`
    }
  }

  return sgMail
  .send(msg)
  .then(() => logger.info('Confirm email sent successfully'))
  .catch(error => logger.error(error.message))
}

module.exports = {
  sendConfirmEmail
}
