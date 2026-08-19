'use strict'


export const map = document.createElement('canvas');
export const mapCtx = map.getContext('2d');
map.width = document.body.clientWidth;
map.height = document.body.clientHeight;
export const mapWidth = map.width;
export const mapHeight = map.height;
export const gameZone = document.getElementById('game-zone');
gameZone.appendChild(map);

export let status = document.getElementById('status');
export let shields = document.getElementById('shields');
export let hull = document.getElementById('hull');
export let shields_setup = document.getElementById('shields_setup');
export let lasers = document.getElementById('lasers');
export let lasers_setup = document.getElementById('lasers_setup');
export let engine_speed = document.getElementById('engine_speed');
export let engine_setup = document.getElementById('engine_setup');
export let capacitor = document.getElementById('capacitor');
export let energy_generation = document.getElementById('energy_generation');

export let control_panel = document.getElementById('control-panel');

export let gameConsole = document.getElementById('console');
export let form = document.getElementById('console-form');
export let input = document.getElementById('console-input');

let entitiesList = new Set;
export function entitiesListAdd (entity) {
    entitiesList.add(entity);
}
export function entitiesListDelete (entity) {
    entitiesList.delete(entity);
}
export function entitiesListGet () {
    return entitiesList;
}
let entityIdCounter = 0;
export function entityIdCounterAdd () {
    ++entityIdCounter;
}
export function entityIdCounterGet () {
    return entityIdCounter;
}

export const timerElem = document.getElementById('round-time');
let roundTime = 0;
export function roundTimeAdd () {
    roundTime++;
}
export function roundTimeGet () {
    return roundTime;
}