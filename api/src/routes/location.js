const express = require('express')

const controller = require('../controllers/location')
const userJwt = require('../middlewares/token').userJwt

const router = express.Router()

router.post('/post-location', userJwt, controller.postLocation)

module.exports = router
