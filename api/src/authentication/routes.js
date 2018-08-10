const express = require('express')

const signInController = require('./sign-in/controller')
const signUpController = require('./sign-up/controller')

const router = express.Router()

router.post('/sign-in', signInController)
router.put('/confirm-email/:token', (req, res) => res.send({ token: 'toto' }))
router.post('/sign-up', signUpController)

module.exports = router