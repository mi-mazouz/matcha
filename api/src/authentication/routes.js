const express = require('express')

const signInController = require('./sign-in/controller')
const signUpController = require('./sign-up/controller')
const confirmEmailcontroller = require('./confirm-email/controller')
const confirmEmailToken = require('../middlewares/token-handling').confirmEmailToken

const router = express.Router()

router.post('/sign-in', signInController)
router.post('/sign-up', signUpController)
router.put('/confirm-email', confirmEmailToken, confirmEmailcontroller)

module.exports = router
