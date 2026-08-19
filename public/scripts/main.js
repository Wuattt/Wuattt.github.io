'use strict'
import { startRendering } from '/scripts/renderer.js';
import { entitiesListGet } from '/scripts/global_variables.js'
import { startRoundTimer } from '/scripts/clock.js'


const update = () => {
    entitiesListGet().forEach((entity) => {
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

