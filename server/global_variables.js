'use strict'
let playersIdCounter = 0;
export function playersIdCounterAdd () {
    return playersIdCounter++;
}
export function playersIdCounterGet () {
    return playersIdCounter;
}

let players = new Map;
export function playersAdd (playerSocket) {
    let newPlayerId = playersIdCounterGet();
    players.set(newPlayerId, playerSocket);
    return playersIdCounterAdd();
}
export function playersDelete (playerId) {
    players.delete(playerId);
}
export function playersGet () {
    return players.values();
}
export function playersObjectGet () {
    return players;
}

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

let cruiserPartsList = new Set;
export function cruiserPartsListAdd (entity) {
    cruiserPartsList.add(entity);
}
export function cruiserPartsListDelete (entity) {
    cruiserPartsList.delete(entity);
}
export function cruiserPartsListGet () {
    return cruiserPartsList;
}

let entityIdCounter = 0;
export function entityIdCounterAdd () {
    ++entityIdCounter;
}
export function entityIdCounterGet () {
    return entityIdCounter;
}

let roundTime = 0;
export function roundTimeAdd () {
    roundTime++;
}
export function roundTimeGet () {
    return roundTime;
}