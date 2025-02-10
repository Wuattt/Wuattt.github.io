'use strict'

let timeLoop;

let map = document.createElement('canvas');
let mapCtx = map.getContext('2d');
map.width = document.body.clientWidth;
map.height = document.body.clientHeight;
let mapWidth = map.width;
let mapHeight = map.height;
document.getElementById('game-zone').appendChild(map);
let entitiesList = new Set;
let entityIdCounter = 0;

let gameConsole = document.getElementById('console');
let form = document.getElementById('console-form');
let input = document.getElementById('console-input');


let timerElem = document.getElementById('round-time');
let roundTime = 0;
let gameSpeed = 60;