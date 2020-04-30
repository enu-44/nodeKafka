const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const conectService = require('./conectService')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/v1', conectService)
app.get('/', (req, res) => res.send('Hello!'))
const server = app.listen(3001, () => console.log('Listening on http://localhost:3001'))

// Kafka consumer
// const consumer = require('./consumer')

// Create a socket.io instance
require('./io')(server)



