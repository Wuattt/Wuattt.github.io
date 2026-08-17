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

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
    socket.on('moveForward', (x, y, entityID) => {
        io.emit('moveForward', x, y, entityID);
    });
    socket.on('moveForwardStop', (x, y, entityID) => {
        io.emit('moveForwardStop', x, y, entityID);
    });
    socket.on('moveBackwards', (x, y, entityID) => {
        io.emit('moveBackwards', x, y, entityID);
    });
    socket.on('moveBackwardsStop', (x, y, entityID) => {
        io.emit('moveBackwardsStop', x, y, entityID);
    });
    socket.on('rotateLeft', (x, y, entityID) => {
        io.emit('rotateLeft', x, y, entityID);
    });
    socket.on('rotateLeftStop', (x, y, entityID) => {
        io.emit('rotateLeftStop', x, y, entityID);
    });
    socket.on('rotateRight', (x, y, entityID) => {
        io.emit('rotateRight', x, y, entityID);
    });
    socket.on('rotateRightStop', (x, y, entityID) => {
        io.emit('rotateRightStop', x, y, entityID);
    });
    socket.on('shoot laser', (deg, shootingEntity) => {
        io.emit('shoot laser', deg, shootingEntity)
    })
});



server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});