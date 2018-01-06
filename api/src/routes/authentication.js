const express = require('express')

const controller = require('../controllers/authentication')

const router = express.Router()

router.post('/signup', controller.signup)
router.post('/signin', controller.signin)
router.post('/reset-password', controller.resetPassword)

module.exports = router
