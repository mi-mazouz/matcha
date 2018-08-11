const express = require('express')
const expressJwt = require('express-jwt')
const path = require('path')
const fs = require('fs')

const signInController = require('./sign-in/controller')
const signUpController = require('./sign-up/controller')
const confirmEmailcontroller = require('./confirm-email/controller')
const tokenHandling = require('../middlewares/token-handling')

const router = express.Router()
const jwtSecret = Buffer.from(fs.readFileSync(path.join(__dirname, '../config/secret.key')), 'base64')

router.post('/sign-in', signInController)
router.post('/sign-up', signUpController)

router.put(
  '/confirm-email/:token',
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
    getToken: tokenHandling.getTokenFromParams
  }),
  tokenHandling.confirmEmailToken,
  confirmEmailcontroller
)

module.exports = router