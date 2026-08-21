'use strict'
import { input } from './DOM_variables.js';
export const socket = io();
import { entitiesFind } from './gamestate_variables.js'
import {controlledEntitySet, controlledEntityGet} from "./gamestate_variables.js";
import {sleep, TICK_INTERVAL} from "../../shared/constants.js";

let playerId = null;
const setPlayerId = (passedPlayerId) => playerId = passedPlayerId;
export const getPlayerId = () => playerId;

socket.on('connected', (socket) => {
    let message = document.createElement('p');
    message.innerHTML = socket + ' connected!';
    message.style.visibility = 'visible';
    setTimeout(() => {
        message.style.visibility = 'inherit';
    }, 2000);
    input.before(message);
})
socket.on('giveControl', async (playerId, entityId) => {
    //TODO: instead of sleep() there should be a "loading"
    // function that says "the game is ready to setup"
    await sleep(500);
    controlledEntitySet(entitiesFind(entityId));
    console.log(controlledEntityGet());
});
socket.on('setPlayerId', (passedPlayerId) => {
    console.log('player: ' + passedPlayerId);
    setPlayerId(passedPlayerId);
});
socket.on('disconnected', (socket, reason) => {
    let message = document.createElement('p');
    message.innerHTML = socket + ' disconnected. Reason: ' + reason;
    message.style.visibility = 'visible';
    console.log(message.innerHTML);
    setTimeout(() => {
        message.style.visibility = 'inherit';
    }, 2000);
    input.before(message);
})
socket.on('chatmessage', (text) => {
    let isSlashFirst = /^\//g.test(text);
    let usedCommand = document.createElement('p');
    usedCommand.innerHTML = text;
    if (isSlashFirst) {
        usedCommand.style.color = 'gray';
    }
    usedCommand.style.visibility = 'visible';
    setTimeout(() => {
        usedCommand.style.visibility = 'inherit';
    }, 2000);
    input.before(usedCommand);
});
socket.on('engineBoostOn', (entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    entity.isSpeedBoostOn = 1;
    entity.updateSpeed();
});
socket.on('engineBoostOff', (entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    entity.isSpeedBoostOn = 0;
    entity.updateSpeed();
});
socket.on('accelerate', (x, y, entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        if (entity.acceleration < 1) {
                entity.acceleration = Math.round((entity.acceleration + 0.1 + Number.EPSILON) * 100) / 100;
            } else {
                entity.acceleration = 1;
            }
        entity.updateSpeed();
    }
});
socket.on('accelerateStop', (entityID) => {

});
socket.on('decelerate', (x, y, entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity.acceleration > 0) {
                    entity.acceleration = Math.round((entity.acceleration - 0.1 + Number.EPSILON) * 100) / 100;
                } else {
                    entity.acceleration = 0;
                }
                entity.updateSpeed();
});
socket.on('decelerateStop', (entityID) => {

});
socket.on('strafeLeft', (x, y, entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentumAcross = -entity.speed;
        entity.strafeLeft();
    }
});
socket.on('strafeLeftStop', (entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    if (entity) {
        entity.momentumAcross = 0;
    }
});
socket.on('strafeRight', (x, y, entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentumAcross = entity.speed;
        entity.strafeRight();
    }
});
socket.on('strafeRightStop', (entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    if (entity) {
        entity.momentumAcross = 0;
    }
});
socket.on('rotateLeft', (deg, entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    entity.deg = deg;
    if (entity) {
        entity.momentumRotation = -entity.rotationSpeed;
        entity.rotateLeft();
    }
});
socket.on('rotateLeftStop', (entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    if (entity) {
        entity.momentumRotation = 0;
    }
});
socket.on('rotateRight', (deg, entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    entity.deg = deg;
    if (entity) {
        entity.momentumRotation = entity.rotationSpeed;
        entity.rotateRight();
    }
});
socket.on('rotateRightStop', (entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    if (entity) {
        entity.momentumRotation = 0;
    }
});
socket.on('shoot laser', (targetX, targetY, entityID) => {
    let shootingEntity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    shootingEntity.shootLaser(targetX, targetY);
})
socket.on('kill', (entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    if (entity) {
        entity.kill();
    }
});