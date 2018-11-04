const express = require('express')

const signInController = require('./sign-in/controller')
const signUpController = require('./sign-up/controller')
const confirmEmailController = require('./confirm-email/controller')
const refreshTokenController = require('./refresh-token/controller')
const resendConfirmEmailController = require('./resend-confirm-email/controller')
const resetPasswordController = require('./reset-password/controller')
const forgotPasswordController = require('./forgot-password/controller')
const resendResetPasswordEmailController = require('./resend-reset-password-email/controller')
const { confirmEmailToken } = require('../middlewares/token-handling')
const { resendConfirmEmailToken } = require('../middlewares/token-handling')
const { resetPasswordToken } = require('../middlewares/token-handling')
const { resendResetPasswordEmailToken } = require('../middlewares/token-handling')

const router = express.Router()

router.post('/sign-in', signInController)
router.post('/sign-up', signUpController)
router.post('/forgot-password', forgotPasswordController)
router.post('/resend-confirm-email', resendConfirmEmailToken, resendConfirmEmailController)
router.post(
  '/resend-reset-password-email',
  resendResetPasswordEmailToken,
  resendResetPasswordEmailController
)
router.patch('/confirm-email', confirmEmailToken, confirmEmailController)
router.patch('/reset-password', resetPasswordToken, resetPasswordController)
router.get('/refresh-token', refreshTokenController)

module.exports = router
