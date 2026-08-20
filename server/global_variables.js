'use strict'


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