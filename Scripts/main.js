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

const updateStatus = () => {
    if (controlledEntity) {
        hull.innerHTML = `Hull: ${controlledEntity.health}`;
        shield.innerHTML = `Shield: ${controlledEntity.shieldEnergyStored} GW`;
        shield_setup.innerHTML = `Shield setup: ${controlledEntity.shieldEnergyAllocated} GW/s`;
        shield_draw.innerHTML = `Shield draw: ${controlledEntity.shieldEnergyDraw} GW/s`;
        lasers.innerHTML = `Lasers: ${controlledEntity.lasersEnergyStored} GW`;
        lasers_setup.innerHTML = `Lasers setup: ${controlledEntity.lasersEnergyAllocated} GW/s`;
        lasers_draw.innerHTML = `Lasers draw: ${controlledEntity.lasersEnergyDraw} GW/s`;
        engine_speed.innerHTML = `Speed: ${controlledEntity.speed * 100} km/s`;
        engine_setup.innerHTML = `Engine setup: ${controlledEntity.engineEnergyAllocated} GW/s`;
        engine_draw.innerHTML = `Engine draw: ${controlledEntity.engineEnergyDraw} GW/s`;
        capacitor.innerHTML = `Capacitor: ${controlledEntity.energy} GW`;
        generator.innerHTML = `Generator: ${controlledEntity.generatorStrength} GW/s`;
        energy_generation.innerHTML = `Energy generation: ${controlledEntity.generatorStrength - controlledEntity.lasersEnergyDraw - controlledEntity.shieldEnergyDraw - controlledEntity.engineEnergyDraw} GW/s`;
    }
}

const update = () => {
    mapCtx.clearRect(0, 0, map.width, map.height);
    timeCountOne();
    entitiesList.forEach((entity) => {
        entity.updateCoordinates();
        if (!entity.isDead) {
            entity.generateEnergy();
        }
        entity.render();
    })
    checkAllCollisions();
    updateStatus();
}

const init = () => {
    setGameSpeed();
}

init();

let dragon = new Battlecruiser(450, 322, 90);
let cyclops = new Battlecruiser(650, 322, 270);