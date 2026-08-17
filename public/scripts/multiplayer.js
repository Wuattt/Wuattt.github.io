'use strict'

const socket = io();
socket.on('moveForward', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentum = entity.speed;
        entity.moveForward();
    }
});
socket.on('moveForwardStop', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentum = 0;
    }
});
socket.on('moveBackwards', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentum = -entity.speed;
        entity.moveBackwards();
    }
});
socket.on('moveBackwardsStop', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.x = x;
    entity.y = y;
    if (entity) {
        entity.momentum = 0;
    }
});
socket.on('turn', (deg, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID);
    entity.deg = deg;
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