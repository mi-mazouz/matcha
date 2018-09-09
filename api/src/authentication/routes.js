const express = require('express')

const signInController = require('./sign-in/controller')
const signUpController = require('./sign-up/controller')
const confirmEmailcontroller = require('./confirm-email/controller')
const refreshTokenController = require('./refresh-token/controller')
const confirmEmailToken = require('../middlewares/token-handling').confirmEmailToken
const refreshToken = require('../middlewares/token-handling').refreshToken

const router = express.Router()

router.post('/sign-in', signInController)
router.post('/sign-up', signUpController)
router.put('/confirm-email', confirmEmailToken, confirmEmailcontroller)
router.get('/refresh-token', refreshToken, refreshTokenController)

module.exports = router
