'use strict'


const map = document.createElement('canvas');
const mapCtx = map.getContext('2d');
map.width = document.body.clientWidth;
map.height = document.body.clientHeight;
const mapWidth = map.width;
const mapHeight = map.height;
const gameZone = document.getElementById('game-zone');
gameZone.appendChild(map);

let status = document.getElementById('status');
let hull = document.getElementById('hull');
let shields = document.getElementById('shields');
let shields_setup = document.getElementById('shields_setup');
let lasers = document.getElementById('lasers');
let lasers_setup = document.getElementById('lasers_setup');
let engine_speed = document.getElementById('engine_speed');
let engine_setup = document.getElementById('engine_setup');
let capacitor = document.getElementById('capacitor');
let energy_generation = document.getElementById('energy_generation');

let control_panel = document.getElementById('control-panel');

let entitiesList = new Set;
let entityIdCounter = 0;






let timerElem = document.getElementById('round-time');
let roundTime = 0;
