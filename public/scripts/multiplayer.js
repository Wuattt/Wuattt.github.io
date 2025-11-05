'use strict'

const socket = io();
socket.on('move', (x, y, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID)
    if (entity) {
        entity.x = x;
        entity.y = y;
    }
});
socket.on('turn', (deg, entityID) => {
    let entity = Array.from(entitiesList).find(e => e.id === entityID)
    entity.deg = deg;
});
socket.on('shoot laser', (deg, entityID) => {
    let shootingEntity = Array.from(entitiesList).find(e => e.id === entityID)
    new Laser(shootingEntity.x, shootingEntity.y, deg, shootingEntity);
})