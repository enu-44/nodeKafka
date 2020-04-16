const express = require('express')
const asyncify = require('express-asyncify')
const kafka = require('kafka-node')

require('dotenv').config();

const kafkaClient = require('./consumer')

const url = asyncify(express.Router())
url.post('/conectTopic', async (request, response) => {
    if (request.body.topic == null ){
        response.status(400).send({status : "Error", msg : "property topic is required"});
        return response;
    }
    connectTopicKafka(request.body.topic)
    response.json(request.body)
})


function connectTopicKafka(topic) {
    const consumer = new kafka.Consumer(
        kafkaClient,
        [{ topic: topic, partition: 0 }],
        {
            groupId: process.env.KAFKA_GROUP,
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8',
            fromOffset: false
        }
    );
    
    /* consumer.on('ready',  () => {
        console.log('conncted topic: ' +topic);
    }); */

    // Listen for Kafka 
    consumer.on('message', ({ value, }) => {
        console.log('here');
        console.log(
            'kafka-> ',
            value
        );
    })

    consumer.on('error', (err) => {
        console.log('eror here');
        // console.log('kafka-> ',err);
        // Tpic not exist--> Create
        var n = err.message.includes(`${topic} do not exist`);
        if(n){
            crearTopic(topic);
        }
    })

    function crearTopic(topic){
        var producer = new kafka.HighLevelProducer(kafkaClient);
        // Create topics async
        producer.createTopics([topic], true, function (err, data) {
            console.log(`NEW TOPIC ${topic} CREATED:  `,data);
            connectTopicKafka(topic)
        });
        // Create topics sync
       /*  producer.createTopics(['topic'], false, function (err, data) {
            console.log(data);
        });*/
    }
}

module.exports = url 
