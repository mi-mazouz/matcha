const express = require('express')

const infosController = require('./infos/controller')
const profileController = require('./profile/controller')

const router = express.Router()

router.get('/me', infosController)
router.get('/get-profile', profileController)

module.exports = router
