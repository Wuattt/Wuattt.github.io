'use strict'


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const inRad = (degrees) => {
    return (degrees * Math.PI) / 180;
}


const renderEntity = (entity) => {
    entity.render();
}


const update = () => {
    mapCtx.clearRect(0, 0, map.width, map.height);
    timeCountOne();
    entitiesList.forEach(renderEntity);
}
