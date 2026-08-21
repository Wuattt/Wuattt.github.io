//here should be network optimisation
import { socket } from './multiplayer.js';
import { ENTITY_TYPE, BYTES_PER_ENTITY } from '../shared/network_protocol.js'

socket.on('updateState', () => {
    console.log('pinged');
});