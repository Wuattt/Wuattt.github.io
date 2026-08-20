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

export const timerElem = document.getElementById('round-time');
