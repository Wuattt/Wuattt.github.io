//work in progress
import { BROADCAST_INTERVAL } from '../shared/constants.js';
import { io } from './server.js'
import { ENTITY_TYPE, BYTES_PER_ENTITY } from '../shared/network_protocol.js'

let timeloop = null;

export const setBROADCAST_INTERVAL = () => {
    timeloop ? clearInterval(timeloop) : 0;
    io.on('connection', (socket) => {
        timeloop = setInterval(() => {
            socket.emit('updateState');
        }, (BROADCAST_INTERVAL + 1000));
    });
}

export const packState = (entities) => {
    const buffer = ArrayBuffer(2 + entities.length * BYTES_PER_ENTITY); // 2 bytes for entities counter. It's not required and can be removed to improve network. Then you would need to derive amount of entities from amount of bytes like this: bytes / 16.
    const view = DataView(buffer);

    view.setUint16(0, entities.length);
    let offset = 2;
    for (const entity of entities) {
        view.setUint32(offset, entity.id); offset += 4;
        view.setUint8(offset, ENTITY_TYPE[entity.type.toUpperCase()]); offset += 1;
        view.setFloat32(offset, entity.x); offset += 4;
        view.setFloat32(offset, entity.y); offset += 4;
        view.setUint16(offset, Math.round(entity.deg * 100)); offset += 2;
        view.setUint8(offset, Math.round(entity.health)); offset += 1;
    }
    return buffer;
}