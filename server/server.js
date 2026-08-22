'use strict'

import express from 'express';
import repl from 'repl';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {Server} from 'socket.io';
import { setBROADCAST_INTERVAL } from './state_broadcast.js';
import { setTICK_INTERVAL } from './game_loop.js'
import { Battlecruiser } from './entities/cruiser.js'
import { entitiesListGet, cruiserPartsListGet, playersAdd, playersDelete, playersGet, playersObjectGet } from './global_variables.js'
import { normalizeDeg } from '../shared/constants.js'

const app = express();
const server = createServer(app);
export const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));
app.use('/shared', express.static(join(__dirname, '..', 'shared')));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
    const playerId = playersAdd(socket.id);
    io.emit('connected', socket.id);
    socket.emit('setPlayerId', playerId);
    const entities = Array.from(entitiesListGet());
    let freeCruisers = entities.filter((entity) => (entity.type === 'cruiser' && entity.player == null));
    let occupiedCruiser = null;
    if (freeCruisers.length > 0) {
        freeCruisers[0].player = socket.id;
        occupiedCruiser = freeCruisers[0];
    }
    if (occupiedCruiser != null) {
        socket.emit('giveControl', playerId, occupiedCruiser.id);
    }
    socket.on('disconnect', (reason) => {
        playersDelete(playerId);
        if (occupiedCruiser != null) {
            occupiedCruiser.player = null;
        }
        io.emit('disconnected', socket.id, reason);
    })
    socket.on('chatmessage', (input) => {
        socket.broadcast.emit('chatmessage', input);
    });
    if (occupiedCruiser != null) {
        socket.on('engineBoostOn', (entityID) => {
            io.emit('engineBoostOn', entityID);
        });
        socket.on('engineBoostOff', (entityID) => {
            io.emit('engineBoostOff', entityID);
        });
        socket.on('accelerate', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity) {
                if (entity.acceleration < 1) {
                    entity.acceleration = Math.round((entity.acceleration + 0.1 + Number.EPSILON) * 100) / 100;
                } else {
                    entity.acceleration = 1;
                }
                entity.updateSpeed();
            }
        });
        socket.on('decelerate', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity.acceleration > 0) {
                entity.acceleration = Math.round((entity.acceleration - 0.1 + Number.EPSILON) * 100) / 100;
            } else {
                entity.acceleration = 0;
            }
            entity.updateSpeed();
        });
        socket.on('rotateLeft', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity) {
                entity.momentumRotation = -entity.rotationSpeed;
                entity.rotateLeft();
            }
        });
        socket.on('rotateLeftStop', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity) {
                entity.momentumRotation = 0;
            }
        });
        socket.on('rotateRight', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity) {
                entity.momentumRotation = entity.rotationSpeed;
                entity.rotateRight();
            }
        });
        socket.on('rotateRightStop', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity) {
                entity.momentumRotation = 0;
            }
        });
        socket.on('strafeLeft', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity) {
                entity.momentumAcross = -entity.speed;
                entity.strafeLeft();
            }
        });
        socket.on('strafeLeftStop', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity) {
                entity.momentumAcross = 0;
            }
        });

        socket.on('strafeRight', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity) {
                entity.momentumAcross = entity.speed;
                entity.strafeRight();
            }
        });
        socket.on('strafeRightStop', (entityID, player) => {
            let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
            if (entity) {
                entity.momentumAcross = 0;
            }
        });
        socket.on('shoot laser', (targetX, targetY, shootingEntity) => {
            io.emit('shoot laser', targetX, targetY, shootingEntity)
        })
    }
});

let dragon = null;
let cyclops = null;

const init = () => {
    setBROADCAST_INTERVAL();
    setTICK_INTERVAL();
    dragon = new Battlecruiser(450, 322, 90);
    cyclops = new Battlecruiser(650, 322, 270);
}
init();

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
    const myConsole = repl.start({ prompt: 'node-server>' });
    const Console = myConsole.context;
    Console.dragon = dragon;
    Console.cyclops = cyclops;
    Console.entitiesList = entitiesListGet();
    Console.cruiserPartsList = cruiserPartsListGet();
    Console.normalizeDeg = normalizeDeg;
    Console.players = playersObjectGet();
});