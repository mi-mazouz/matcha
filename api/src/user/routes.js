const express = require('express')

const getInfosController = require('./infos/controller')
const profileController = require('./profile/controller')

const router = express.Router()

router.get('/me', getInfosController)
router.get('/get-profile', profileController)

module.exports = router
