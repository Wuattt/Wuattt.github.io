'use strict'
import { startRendering } from '/scripts/renderer.js'



const update = () => {
    entitiesList.forEach((entity) => {
        if (!entity.isDead) {
            entity.generateEnergy();
        }
    })
    // checkAllCollisions(); // move to game_loop.js
}

const init = () => {
    startRendering();
    startRoundTimer();
}

init();

