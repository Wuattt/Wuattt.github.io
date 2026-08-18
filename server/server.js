'use strict'

import express from 'express';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {Server} from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));
app.use('/shared', express.static(join(__dirname, '..', 'shared')));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
    socket.on('chatmessage', (input) => {
        socket.emit('chatmessage', input);
    });
    socket.on('engineBoostOn', (entityID) => {
        io.emit('engineBoostOn', entityID);
    });
    socket.on('engineBoostOff', (entityID) => {
        io.emit('engineBoostOff', entityID);
    });
    socket.on('moveForward', (x, y, entityID) => {
        io.emit('moveForward', x, y, entityID);
    });
    socket.on('moveForwardStop', (entityID) => {
        io.emit('moveForwardStop', entityID);
    });
    socket.on('moveBackwards', (x, y, entityID) => {
        io.emit('moveBackwards', x, y, entityID);
    });
    socket.on('moveBackwardsStop', (entityID) => {
        io.emit('moveBackwardsStop', entityID);
    });
    socket.on('strafeLeft', (x, y, entityID) => {
        io.emit('strafeLeft', x, y, entityID);
    });
    socket.on('strafeLeftStop', (entityID) => {
        io.emit('strafeLeftStop', entityID);
    });

    socket.on('strafeRight', (x, y, entityID) => {
        io.emit('strafeRight', x, y, entityID);
    });
    socket.on('strafeRightStop', (entityID) => {
        io.emit('strafeRightStop', entityID);
    });
    socket.on('rotateLeft', (x, y, entityID) => {
        io.emit('rotateLeft', x, y, entityID);
    });
    socket.on('rotateLeftStop', (entityID) => {
        io.emit('rotateLeftStop', entityID);
    });
    socket.on('rotateRight', (x, y, entityID) => {
        io.emit('rotateRight', x, y, entityID);
    });
    socket.on('rotateRightStop', (entityID) => {
        io.emit('rotateRightStop', entityID);
    });
    socket.on('shoot laser', (targetX, targetY, shootingEntity) => {
        io.emit('shoot laser', targetX, targetY, shootingEntity)
    })
});



server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});