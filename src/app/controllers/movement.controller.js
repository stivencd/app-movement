const movementService = require('../services/movement.service')
const logProvider = require('../middlewares/logprovider');

const getMovementByAccountId = async (req, res) => {
    logProvider.info('Start getMovementByAccountId in movement.controller.js')

    const accountId = parseInt(req.params.accountId)
    return res.send(await movementService.getMovementByAccountId(accountId))
}


module.exports = { getMovementByAccountId }