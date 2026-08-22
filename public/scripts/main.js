'use strict'
import { startRendering } from '/scripts/rendering/renderer.js';
import {gameReady} from "./loading.js";
//import { startRoundTimer } from '/scripts/clock.js'


/* const update = () => {
    entitiesListGet().forEach((entity) => {
        if (!entity.isDead) {
            entity.generateEnergy();
        }
    })
    // checkAllCollisions(); // move to game_loop.js
} */

const init = async () => {
    await gameReady;
    startRendering();
    //startRoundTimer();
}

init();

