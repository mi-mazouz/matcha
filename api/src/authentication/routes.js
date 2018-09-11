const express = require('express')

const signInController = require('./sign-in/controller')
const signUpController = require('./sign-up/controller')
const confirmEmailController = require('./confirm-email/controller')
const refreshTokenController = require('./refresh-token/controller')
const resendConfirmEmailController = require('./resend-confirm-email/controller')
const forgotPasswordController = require('./forgot-password/controller')
const confirmEmailToken = require('../middlewares/token-handling').confirmEmailToken
const resendConfirmEmailToken = require('../middlewares/token-handling').resendConfirmEmailToken

const router = express.Router()

router.post('/sign-in', signInController)
router.post('/sign-up', signUpController)
router.post('/forgot-password', forgotPasswordController)
router.get('/refresh-token', refreshTokenController)
router.post('/resend-confirm-email', resendConfirmEmailToken, resendConfirmEmailController)
router.patch('/confirm-email', confirmEmailToken, confirmEmailController)

module.exports = router
