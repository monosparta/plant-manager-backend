#!/usr/bin/env node

/**
 * Module dependencies.
 */
import dotenv from 'dotenv';
dotenv.config();
import app from '../app';
import debugLib from 'debug';
import http from 'http';
const debug = debugLib('your-project-name:server');
import mqtt from 'mqtt';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Create the socket connection.
 */

const io = require('socket.io')(server);

/**
 * Create the MQTT client to connect to the MQTT Broker
 */

const mqttHost = process.env.MQTT_HOST || 'localhost';
const mqttPort = process.env.MQTT_PORT || 1883;
const client = mqtt.connect(`mqtt://${mqttHost}:${mqttPort}`, {
    username: process.env.MQTT_USERNAME, 
    password: process.env.MQTT_PASSWORD,
});

client.on('connect', function () {
    console.log('MQTT CONNECTION START');
    client.subscribe(process.env.MQTT_TPOIC || 'Plant/Data');
});
  
io.on('connection', function (socket) {
    client.on('message', function (topic, msg) {
        socket.emit(process.env.SOCKET_TOPIC || 'Plant/Data', JSON.parse(msg.toString()));
    });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
    // named pipe
        return val;
    }

    if (port >= 0) {
    // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Server ready!');
}
