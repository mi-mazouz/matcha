const express = require('express')

const signInController = require('./sign-in/controller')
const signUpController = require('./sign-up/controller')
const confirmEmailController = require('./confirm-email/controller')
const refreshTokenController = require('./refresh-token/controller')
const resendConfirmEmailController = require('./resend-confirm-email/controller')
const confirmEmailToken = require('../middlewares/token-handling').confirmEmailToken
const resendConfirmEmailToken = require('../middlewares/token-handling').resendConfirmEmailToken
const refreshToken = require('../middlewares/token-handling').refreshToken

const router = express.Router()

router.post('/sign-in', signInController)
router.post('/sign-up', signUpController)
router.post('/resend-confirm-email', resendConfirmEmailToken, resendConfirmEmailController)
router.patch('/confirm-email', confirmEmailToken, confirmEmailController)
router.get('/refresh-token', refreshToken, refreshTokenController)

module.exports = router
