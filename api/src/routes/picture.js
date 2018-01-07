const express = require('express')

const controller = require('../controllers/picture')
const userJwt = require('../middlewares/token').userJwt

const router = express.Router()

router.post('/save-profile', userJwt, controller.saveProfile)

module.exports = router
