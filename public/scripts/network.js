//here should be network optimisation
import { socket } from './multiplayer.js';
import { ENTITY_TYPE, BYTES_PER_ENTITY } from '../shared/network_protocol.js'
import { applyServerState } from './sync.js'
import {markFirstStateReceived} from "./loading.js";

const TYPE_NAMES = Object.fromEntries(
    Object.entries(ENTITY_TYPE).map(([name, id]) => [id, name.toLowerCase()])
);

const unpackState = (buffer) => {
    const view = new DataView(buffer);
    const count = view.getUint16(0);
    const entities = [];
    let offset = 2;

    for (let i = 0; i < count; i++) {
        entities.push({
            id: view.getUint32(offset),
            type: TYPE_NAMES[view.getUint8(offset + 4)],
            x: view.getFloat32(offset + 5),
            y: view.getFloat32(offset + 9),
            deg: view.getUint16(offset + 13) / 100,
            health: view.getUint8(offset + 15)
        });
        offset += BYTES_PER_ENTITY;
    }
    return entities;
}
let isFirstTime = true;
socket.on('updateState', (buffer) => {
    applyServerState(unpackState(buffer));
    if (isFirstTime) {
        markFirstStateReceived();
        isFirstTime = false;
    }
});