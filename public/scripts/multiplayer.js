'use strict'

const socket = io();
socket.on('moveForward', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentumAlong = entity.speed;
        entity.moveForward();
    }
});
socket.on('moveForwardStop', (entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    if (entity) {
        entity.momentumAlong = 0;
    }
});
socket.on('moveBackwards', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentumAlong = -entity.speed;
        entity.moveBackwards();
    }
});
socket.on('moveBackwardsStop', (entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    if (entity) {
        entity.momentumAlong = 0;
    }
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