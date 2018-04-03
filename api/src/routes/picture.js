const express = require('express')

const controller = require('../controllers/picture')
const userJwt = require('../middlewares/token').userJwt

const router = express.Router()

router.post('/save-profile', userJwt, controller.saveProfile)
router.post('/save', userJwt, controller.saveAllExceptProfile)
router.delete('/remove', userJwt, controller.remove)

module.exports = router
