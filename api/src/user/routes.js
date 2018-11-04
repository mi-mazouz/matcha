const express = require('express')

const getProfileController = require('./profile/controller')

const router = express.Router()

router.get('/get-profile', getProfileController)

module.exports = router
