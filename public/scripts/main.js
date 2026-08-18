'use strict'


const updateStatus = () => {
    if (controlledEntity) {
        hull.innerHTML = `Hull: ${controlledEntity.health}`;
        shield.innerHTML = `Shield: ${controlledEntity.shieldEnergyStored} GW`;
        shield_setup.innerHTML = `Shield setup: ${controlledEntity.shieldEnergyAllocated} GW/s`;
        shield_draw.innerHTML = `Shield draw: ${controlledEntity.shieldEnergyDraw} GW/s`;
        lasers.innerHTML = `Lasers: ${controlledEntity.lasersEnergyStored} GW`;
        lasers_setup.innerHTML = `Lasers setup: ${controlledEntity.lasersEnergyAllocated} GW/s`;
        lasers_draw.innerHTML = `Lasers draw: ${controlledEntity.lasersEnergyDraw} GW/s`;
        engine_speed.innerHTML = `Speed: ${controlledEntity.speed} km/s`;
        engine_setup.innerHTML = `Engine setup: ${controlledEntity.engineEnergyAllocated} GW/s`;
        engine_draw.innerHTML = `Engine draw: ${controlledEntity.engineEnergyDraw} GW/s`;
        capacitor.innerHTML = `Capacitor: ${controlledEntity.energy} GW`;
        generator.innerHTML = `Generator: ${controlledEntity.generatorStrength} GW/s`;
        energy_generation.innerHTML = `Energy generation: ${controlledEntity.generatorStrength - controlledEntity.lasersEnergyDraw - controlledEntity.shieldEnergyDraw - controlledEntity.engineEnergyDraw} GW/s`;
    }
}

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

let dragon = new Battlecruiser(450, 322, 90);
let cyclops = new Battlecruiser(650, 322, 270);