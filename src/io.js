const configConsumer = require('./consumer')

const conectServiceKafka = require('./conectService')

const createSocket = (server) => {
    const io = require('socket.io')(server)
    // Handle Socket connections
    io.on('connection', socket => {
        console.log(`--> JOINED: ${socket.id}`)
        socket.on('new_conection', data => {
            console.log("new user conected")
            socket.join(data.topic);
            conectServiceKafka.connectTopicKafka(data.topic)
        })
        socket.on('disconnect', () => console.log(`<-- LEFT  : ${socket.id}`))
        return io
    })
    //Consumer Config
    configConsumer.consumer.on('message',  (message) => {
        console.log('MSG: topic: %s, offset: %s', message.topic, message.offset);
        let jsonValue = JSON.parse(message.value)
        if(message.topic.includes('message-')){
            console.log('kafka MESSAGE-> ', jsonValue );
           // io.emit("notificacion", { topic: message.topic, value: message.value })
            io.to(jsonValue.usuarioReceptor).emit("mensaje", { topic: message.topic, value: message.value });
        }else {
            console.log('kafka NOTIFICACION-> ',jsonValue);
            // io.emit("message", { topic: message.topic, value: message.value })
            io.to(message.topic).emit("notificacion", { topic: message.topic, value: message.value });
        }
    });

    configConsumer.consumer.on('error', (err) => {
        console.log('CONSUMER ERROR:', err);
    })

    configConsumer.consumer.on('offsetOutOfRange', function (err) {
        console.log('CONSUMER OOR:', err);
    });

    configConsumer.consumer.on('done', function() {
        console.log('Consumer got done');
    });
}

module.exports = createSocket