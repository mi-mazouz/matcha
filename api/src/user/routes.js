const express = require('express')

const meController = require('./me/controller')
const infosController = require('./infos/controller')

const router = express.Router()

router.get('/me', meController)
router.get('/infos', infosController)

module.exports = router
