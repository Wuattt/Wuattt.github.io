//work in progress
import { TICK_INTERVAL } from "../shared/constants.js";

let timeLoop = null;

const setTICK_INTERVAL = () => {
    timeloop ? clearInterval(timeloop) : 0;
    timeloop = setInterval(() => {
            update();
        }, (TICK_INTERVAL));
}