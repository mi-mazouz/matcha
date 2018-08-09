const sgMail = require('@sendgrid/mail')

const config = require('../config')
const logger = require('./logger')

const sendEmailConfirm = (userData, token) => {
  sgMail.setApiKey(config.SENDGRID_API_KEY)
  sgMail.setSubstitutionWrappers('{{', '}}')
  
  const msg = {
    to: userData.email,
    from: 'staff@matcha.com',
    subject: 'Confirm your email',
    templateId: config.EMAIL_TEMPLATES['FR'].CONFIRM_EMAIL_ID,
    dynamicTemplateData: {
      firstName: userData.firstName,
      link: `${config.APP_END_POINT}/confirm-email?token=${token}`
    }
  }

  return sgMail.send(msg)
  .then(() => logger.info('Confirm email sent successfully'))
  .catch((error) => logger.error(error.message))
} 

module.exports = {
  sendEmailConfirm 
}