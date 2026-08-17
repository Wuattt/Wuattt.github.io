//work in progress
const { TICK_RATE } = require("../shared/constants.js");

const setTICK_RATE = (coefficient = TICK_RATE) => {
    TICK_RATE = coefficient;
    clearInterval(timeLoop);
    let timeLoop = (TICK_RATE) => {
        return setInterval(() => {
            update();
        }, (TICK_RATE));
    };
    timeLoop((TICK_RATE));
}