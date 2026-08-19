'use strict'
import { gameConsole, form, input } from '/shared/constants.js';
export const socket = io();

socket.on('chatmessage', (text) => {
    let isSlashFirst = /^\//g.test(text);
    let usedCommand = document.createElement('p');
    usedCommand.innerHTML = text;
    console.log(usedCommand);
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
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.isSpeedBoostOn = 1;
    entity.updateSpeed();
});
socket.on('engineBoostOff', (entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.isSpeedBoostOn = 0;
    entity.updateSpeed();
});
socket.on('moveForward', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
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
socket.on('moveForwardStop', (entityID) => {

});
socket.on('moveBackwards', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity.acceleration > 0) {
                    entity.acceleration = Math.round((entity.acceleration - 0.1 + Number.EPSILON) * 100) / 100;
                } else {
                    entity.acceleration = 0;
                }
                entity.updateSpeed();
});
socket.on('moveBackwardsStop', (entityID) => {

});
socket.on('strafeLeft', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentumAcross = -entity.speed;
        entity.strafeLeft();
    }
});
socket.on('strafeLeftStop', (entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    if (entity) {
        entity.momentumAcross = 0;
    }
});
socket.on('strafeRight', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentumAcross = entity.speed;
        entity.strafeRight();
    }
});
socket.on('strafeRightStop', (entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    if (entity) {
        entity.momentumAcross = 0;
    }
});
socket.on('rotateLeft', (deg, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.deg = deg;
    if (entity) {
        entity.momentumRotation = -entity.rotationSpeed;
        entity.rotateLeft();
    }
});
socket.on('rotateLeftStop', (entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    if (entity) {
        entity.momentumRotation = 0;
    }
});
socket.on('rotateRight', (deg, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.deg = deg;
    if (entity) {
        entity.momentumRotation = entity.rotationSpeed;
        entity.rotateRight();
    }
});
socket.on('rotateRightStop', (entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    if (entity) {
        entity.momentumRotation = 0;
    }
});
socket.on('shoot laser', (targetX, targetY, entityID) => {
    let shootingEntity = Array.from(entitiesList).find(e => e.id === entityID);
    shootingEntity.shootLaser(targetX, targetY);
})
socket.on('kill', (entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    if (entity) {
        entity.kill();
    }
});