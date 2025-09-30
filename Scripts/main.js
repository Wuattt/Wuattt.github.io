'use strict'

const setGameSpeed = (coefficient = gameSpeed) => {
    gameSpeed = coefficient;
    clearInterval(timeLoop);
    timeLoop = ((gameSpeed) => {
        return setInterval(() => {
            update();
        }, (1000 / gameSpeed));
    })(gameSpeed);
}

const update = () => {
    mapCtx.clearRect(0, 0, map.width, map.height);
    timeCountOne();
    renderCollisionMap();
    entitiesList.forEach(renderEntity);
}

const init = () => {
    setGameSpeed();
}

init();

let dragon = new Battlecruiser(450, 322, 90);
let cyclops = new Battlecruiser(650, 322, 270);