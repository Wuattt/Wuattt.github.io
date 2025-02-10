'use strict'



function strafeLeft () {
    dragon.x += 1 * (Math.round(((Math.cos(inRad(dragon.deg) - Math.PI + Number.EPSILON) * 1000))) / 1000);
    dragon.y += 1 * (Math.round(((Math.sin(inRad(dragon.deg) - Math.PI + Number.EPSILON) * 1000))) / 1000);
}

function strafeRight () {
    dragon.x -= 1 * (Math.round(((Math.cos(inRad(dragon.deg) - Math.PI + Number.EPSILON) * 1000))) / 1000);
    dragon.y -= 1 * (Math.round(((Math.sin(inRad(dragon.deg) - Math.PI + Number.EPSILON) * 1000))) / 1000);
}

function moveForward () {
    dragon.x += 1 * (Math.round(((Math.cos(inRad(dragon.deg) - Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    dragon.y += 1 * (Math.round(((Math.sin(inRad(dragon.deg) - Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
}

function moveBackwards () {
    dragon.x -= 1 * (Math.round(((Math.cos(inRad(dragon.deg) - Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    dragon.y -= 1 * (Math.round(((Math.sin(inRad(dragon.deg) - Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
}

function rotateLeft () {
    dragon.deg -= 1;
}

function rotateRight () {
    dragon.deg +=1;
}


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