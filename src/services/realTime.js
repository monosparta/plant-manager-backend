import mqtt from 'mqtt';

const lastData = {};
const emitSocket = [];

const initSocketServer = (server) => {
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
        password: process.env.MQTT_PASSWORD
    });

    /**
     * Subscribe to the topic
     */

    client.on('connect', function () {
        console.log('MQTT CONNECTION START');
        client.subscribe(process.env.MQTT_TOPIC || 'Plant/Data');
    });


    client.on('message', function (topic, payload) {
        const msg = JSON.parse(payload.toString());
        lastData[msg.container_ID] = msg;

        emitSocket.forEach(x => x(msg));
    });

    /**
     * Websocket will emit the message when the client get the response from the topic
     */

    io.on('connection', function (socket) {
        for (const data of Object.keys(lastData)) {
            if (!lastData[data]) continue;
            socket.emit(
                process.env.SOCKET_TOPIC || 'Plant/Data',
                lastData[data]
            );
        }
        const emit = (msg) => socket.emit(process.env.SOCKET_TOPIC || 'Plant/Data', msg);

        socket.on('disconnect', () => {
            const index = emitSocket.indexOf(emit);
            if (index !== -1) emitSocket.splice(index, 1);
        });

        emitSocket.push(emit);
    });
};

export { initSocketServer };
