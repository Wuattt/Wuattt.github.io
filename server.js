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
    socket.on('move', (x, y, entityID) => {
        io.emit('move', x, y, entityID);
    });
    socket.on('turn', (deg, entityID) => {
        io.emit('turn', deg, entityID);
    });
    socket.on('shoot laser', (deg, shootingEntity) => {
        io.emit('shoot laser', deg, shootingEntity)
    })
});



server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});