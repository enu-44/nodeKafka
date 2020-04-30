const kafka = require('kafka-node')

require('dotenv').config();
const KafkaClient = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_SERVER });
const consumer = new kafka.Consumer(
    KafkaClient,
    [],
    {
        groupId: process.env.KAFKA_GROUP,
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: false
    }
);

KafkaClient.on('close', function(){ 
    console.log('KafkaClient close'); 
});
KafkaClient.on('error', function(err) { console.log('KafkaClient Error:', err); });
KafkaClient.on('connect', function(){ console.log('Kafka connected'); });
KafkaClient.on('ready', function() {
    console.log('client is ready, register for quotes');
});

module.exports = {consumer, KafkaClient};