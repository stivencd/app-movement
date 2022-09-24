const { Kafka, Partitioners } = require('kafkajs')
 
const kafka = new Kafka({
    createPartitioner: Partitioners.LegacyPartitioner,
    clientId: 'transaction-client',
    brokers: [process.env.KAFKA_SERVER],
})
 
const messagesAsync = {
    send: async (transactionId, accountId, amount, type) => {
        const producer = kafka.producer({
            allowAutoTopicCreation: true,
            transactionTimeout: 30000
        })
    
        await producer.connect()
    
        var data = {
            transactionId: transactionId,
            accountId: accountId,
            type: type,
            creationDate:  new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').toString(),
            amount: amount
        }
    
        await producer.send({
            topic: 'transaction-topic',
            messages: [
                { value: JSON.stringify(data) }
            ],
        })
        console.log('Message sent to topic transaction-topic')
 
        await producer.disconnect()
    }
}
 
module.exports = messagesAsync;