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
socket.on('moveForwardStop', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
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
socket.on('moveBackwardsStop', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentumAlong = 0;
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
socket.on('rotateLeftStop', (deg, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.deg = deg;
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
socket.on('rotateRightStop', (deg, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.deg = deg;
    if (entity) {
        entity.momentumRotation = 0;
    }
});
socket.on('shoot laser', (deg, entityID) => {
    let shootingEntity = Array.from(entitiesList).find(e => e.id === entityID);
    new Laser(shootingEntity.x, shootingEntity.y, deg, shootingEntity);
})
socket.on('kill', (entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    if (entity) {
        entity.kill();
    }
});