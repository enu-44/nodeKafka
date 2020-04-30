const express = require('express')
const asyncify = require('express-asyncify')
const kafka = require('kafka-node')
const configConsumer = require('./consumer')
const webpush = require('./webpush')

let pushSuscriptions;

const url = asyncify(express.Router())


url.post('/conectTopic', async (request, response) => {
    if (request.body.topic == null ){
        response.status(400).send({status : "Error", msg : "property topic is required"});
        return response;
    }
    connectTopicKafka(request.body.topic)
    response.json(request.body)
})

url.post('/suscription',async (req,res) => {
    pushSuscriptions = req.body    
    console.log("Conexion Push Manager 1", pushSuscriptions);
    res.status(200).json();
})

function connectTopicKafka(topic) {
// const connectTopicKafka = (topic) => {

    // SUSCRIBE TOPICS NOTIIFCATIONS
    //=================================================================
    configConsumer.consumer.addTopics([topic], function (err, added) {
        if (err) {
            console.log('NOTIFICATION TOPIC ERROR');
            console.error(err);
            var n = err.message.includes(`${topic} notificacion do not exist`);
            if(n) {
                crearTopic(topic);
            }
        }
        console.log("TOPIC NOTIFICATION ADDED",added);
    });

    // SUSCRIBE TOPICS MESSAGING
    //=================================================================
    configConsumer.consumer.addTopics(['message-'+topic], function (err, added) {
        if (err) {
            console.log('MESSAGE TOPIC ERROR');
            console.error(err);
            var n = err.message.includes(`'message-'${topic} message do not exist`);
            if(n) {
                crearTopic('message-'+topic);
            }
        }
        console.log("TOPIC MESSAGE ADDED",added);
    });

    function crearTopic(topic){
        var producer = new kafka.HighLevelProducer(configConsumer.KafkaClient);
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


configConsumer.consumer.on('ready',  () => {
    console.log('conncted topic: ' +topic);
}); 

<<<<<<< HEAD
=======
// Listen for Kafka 
configConsumer.consumer.on('message', ({ value, }) => {
    console.log('here');
    console.log(
        'kafka-> ',
        value
    );
     webpush.sendNotification(pushSuscriptions, value) 
})
>>>>>>> f6263f3af13c75c753b3336b7e9e1bbb132c581b


module.exports = {
    connectTopicKafka,
}
 
