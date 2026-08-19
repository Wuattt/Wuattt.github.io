//work in progress
const TICK_RATE = 60;

export const TICK_INTERVAL = 1000 / TICK_RATE; 
export const BROADCAST_INTERVAL = 1000 / TICK_RATE; 

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export const inRad = (degrees) => {
    return (degrees * Math.PI) / 180;
}
export const inDeg = (rad) => {
    return (rad / Math.PI) * 180;
}