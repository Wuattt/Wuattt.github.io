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

const init = () => {
    setGameSpeed();
}

init();

let dragon = new Battlecruiser(350, 222, 90);
let cyclops = new Battlecruiser(950, 222, 270);