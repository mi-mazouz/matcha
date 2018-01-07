const express = require('express')

const controller = require('../controllers/user')
const userJwt = require('../middlewares/token').userJwt

const router = express.Router()

router.get('/get-infos', userJwt, controller.getInfos)
router.patch('/update-infos', userJwt, controller.updateInfos)

module.exports = router
