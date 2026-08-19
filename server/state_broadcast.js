//work in progress
import { BROADCAST_INTERVAL } from '../shared/constants.js';
import { io } from "./server.js"

let timeloop = null;

export const setBROADCAST_INTERVAL = () => {
    timeloop ? clearInterval(timeloop) : 0;
    io.on('connection', (socket) => {
        timeloop = setInterval(() => {
            socket.emit('ping');
        }, (BROADCAST_INTERVAL + 1000));
    });
}