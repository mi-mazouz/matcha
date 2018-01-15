const utils = require('../utils')

const sendConfirmationMail = (mail, firstName) => {
  const mailOptions = {
    from: '"Matcha" <admin@matcha.com>',
    to: mail,
    subject: 'Confirmation of your account',
    text: `Welcom on Matcha ${firstName}.\n\nYour account is now activated. Enjoy on Matcha !!`
  }

  utils.transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.error(err)
  })
}

const sendResetPasswordMail = (mail, firstName, newPassword) => {
  const mailOptions = {
    from: '"Matcha" <admin@matcha.com>',
    to: mail,
    subject: 'Reset your password',
    text: `Hi ${firstName}, here you can find your new password:\n${newPassword}.\n\n You should to change it in your profil settings`
  }

  utils.transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.error(err)
  })
}

module.exports = {
  sendConfirmationMail,
  sendResetPasswordMail
}
