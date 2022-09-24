const express = require('express')
const router = express.Router()

const { getMovementByAccountId } = require('../controllers/movement.controller')

router.get('/getMovementByAccountId/:accountId', getMovementByAccountId)

module.exports = router