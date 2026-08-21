//work in progress
import { TICK_INTERVAL } from "../shared/constants.js";
import { packState } from './state_broadcast.js'

let timeloop = null;

export const setTICK_INTERVAL = () => {
    timeloop ? clearInterval(timeloop) : 0;
    timeloop = setInterval(() => {
            
        }, (TICK_INTERVAL + 1000));
}