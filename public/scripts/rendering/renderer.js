//work in progress
import { TICK_INTERVAL, inRad } from '../../../shared/constants.js';
import { mapCtx, map } from '../DOM_variables.js'
//import { controlledEntity } from '../controller.js';
import { entitiesGet } from '../gamestate_variables.js'
import { SPRITES, ENTITY_VISUALS } from './sprites.js'

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
    const sprite = SPRITES[entity.type];
    const visual = ENTITY_VISUALS[entity.type];
    if (!sprite || !visual) return;

    mapCtx.save();
    mapCtx.rotate(inRad(entity.deg));
    mapCtx.drawImage(sprite, entity.x * (Math.round(((Math.cos(inRad(entity.deg) + Number.EPSILON) * 1000))) / 1000) + entity.y * (Math.round(((Math.sin(inRad(entity.deg) + Number.EPSILON) * 1000))) / 1000) - (visual.width / 2), entity.x * (Math.round(((Math.cos(inRad(entity.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000) + entity.y * (Math.round(((Math.cos(inRad(entity.deg) + Number.EPSILON) * 1000))) / 1000) - visual.height / 2, visual.width, visual.height);
    // rotate() rotates canvas instead of sprite image, so need to account for that when drawing.
    mapCtx.restore();
    mapCtx.beginPath();
    mapCtx.arc(entity.x, entity.y, 3, 0, 2 * Math.PI); // exact coordinates for testing
    mapCtx.closePath();
    mapCtx.stroke();
    mapCtx.strokeStyle = 'white';
}

export const startRendering = () => setInterval(() => {
    clearMap();
    entitiesGet().forEach((entity) => {
        render(entity);
    })
}, TICK_INTERVAL);
