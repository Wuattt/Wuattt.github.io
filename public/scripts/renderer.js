//work in progress
function clearMap () {
    mapCtx.clearRect(0, 0, map.width, map.height);
}

const startRendering = () => setInterval(() => {
    clearMap();
    entitiesList.forEach((entity) => {
        entity.updateCoordinates();
        entity.render();
        updateStatus();
        entity.generateEnergy();
    })
}, 10);
