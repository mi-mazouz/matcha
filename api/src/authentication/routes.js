const express = require('express')

const signInController = require('./sign-in/controller')

const router = express.Router()

router.post('/sign-in', signInController)

module.exports = router