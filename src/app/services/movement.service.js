const movementRepository = require('../repositories/movement.repository')
const redis = require('redis');
const logProvider = require('../middlewares/logprovider');

const client = redis.createClient({
    url: process.env.DB_REDIS_URL,
    tls: {
        rejectUnauthorized: false
    },
    legacyMode: true
});

client.connect();
client.on('error', function(err) {
    console.log('Redis Error: ', err);
});

const movementService = {
    getMovementByAccountId: async (accountId) => {
        logProvider.info('Start getMovementByAccountId in movement.services.js')
        const key = `key-mevement-${accountId}`;
        return new Promise((resolve, reject) => {
            client.get(key, async function (err, reply) {
                if (err) return reject(err);
                if (reply === null) {
                    console.log('Register information in redis');
                    var result = await movementRepository.getMovementByAccountId(accountId);
                    await client.set(key, JSON.stringify(result), 'EX', 30);
                    return resolve(result);

                } else {
                    console.log('Showing redis information');
                    return resolve(JSON.parse(reply));
                }
            });
        });
    }
}

module.exports = movementService