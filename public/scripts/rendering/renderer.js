//work in progress
import { TICK_INTERVAL } from '../../../shared/constants.js';
import { mapCtx, map } from '../DOM_variables.js'
//import { controlledEntity } from '../controller.js';
import { entitiesGet } from '../gamestate_variables.js'


function clearMap () {
    mapCtx.clearRect(0, 0, map.width, map.height);
}
/* 
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
} */

const render = (entity) => {
    switch(entity.type) {
        case 'cruiser':
            console.log(entity);
            break;
        default:
            
    }
}

export const startRendering = () => setInterval(() => {
    clearMap();
    entitiesGet().forEach((entity) => {
        render(entity);
    })
}, TICK_INTERVAL);
