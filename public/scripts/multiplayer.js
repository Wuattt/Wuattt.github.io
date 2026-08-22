'use strict'
import { input } from './DOM_variables.js';
export const socket = io();
import { entitiesFind } from './gamestate_variables.js'
import {controlledEntitySet, controlledEntityGet} from "./gamestate_variables.js";
import {sleep, TICK_INTERVAL} from "../../shared/constants.js";
import {gameReady, markConnected, FirstStateReceived} from "./loading.js";

let playerId = null;
const setPlayerId = (passedPlayerId) => playerId = passedPlayerId;
export const getPlayerId = () => playerId;

socket.on('connected', (socket) => {
    markConnected();
    let message = document.createElement('p');
    message.innerHTML = socket + ' connected!';
    message.style.visibility = 'visible';
    setTimeout(() => {
        message.style.visibility = 'inherit';
    }, 2000);
    input.before(message);
})
socket.on('giveControl', async (playerId, entityId) => {
    //TODO: instead of sleep() there should be a "loading"
    // function that says "the game is ready to setup"
    await FirstStateReceived;
    controlledEntitySet(entitiesFind(entityId));
});
socket.on('setPlayerId', (passedPlayerId) => {
    setPlayerId(passedPlayerId);
});
socket.on('disconnected', (socket, reason) => {
    let message = document.createElement('p');
    message.innerHTML = socket + ' disconnected. Reason: ' + reason;
    message.style.visibility = 'visible';
    console.log(message.innerHTML);
    setTimeout(() => {
        message.style.visibility = 'inherit';
    }, 2000);
    input.before(message);
})
socket.on('chatmessage', (text) => {
    let isSlashFirst = /^\//g.test(text);
    let usedCommand = document.createElement('p');
    usedCommand.innerHTML = text;
    if (isSlashFirst) {
        usedCommand.style.color = 'gray';
    }
    usedCommand.style.visibility = 'visible';
    setTimeout(() => {
        usedCommand.style.visibility = 'inherit';
    }, 2000);
    input.before(usedCommand);
});
socket.on('shoot laser', (targetX, targetY, entityID) => {
    let shootingEntity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    shootingEntity.shootLaser(targetX, targetY);
})
socket.on('kill', (entityID) => {
    let entity = Array.from(entitiesListGet()).find(e => e.id === entityID);
    if (entity) {
        entity.kill();
    }
});