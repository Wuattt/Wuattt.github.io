//work in progress
import { TICK_INTERVAL } from "../shared/constants.js";

const setTICK_INTERVAL = (coefficient = TICK_INTERVAL) => {
    TICK_INTERVAL = coefficient;
    clearInterval(timeLoop);
    const timeLoop = (TICK_INTERVAL) => {
        return setInterval(() => {
            update();
        }, (TICK_INTERVAL));
    };
    timeLoop((TICK_INTERVAL));
}