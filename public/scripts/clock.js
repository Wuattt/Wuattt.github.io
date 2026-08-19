'use strict'
import { timerElem, roundTimeAdd, roundTimeGet } from '/scripts/global_variables.js';
let roundTime = roundTimeGet();

export const startRoundTimer = () => setInterval(() => {
    roundTime = roundTimeGet();
    let timeHours = () => (roundTime / 3600) < 10 ? `0${Math.floor(roundTime / 3600)}` : Math.floor(roundTime / 3600);
    let timeMinutes = () => (roundTime / 60 % 60) < 10 ? `0${Math.floor(roundTime / 60 % 60)}` : Math.floor(roundTime / 60 % 60);
    let timeSeconds = () => (roundTime % 60) < 10 ? `0${roundTime % 60}` : roundTime % 60;
    timerElem.innerHTML = `${timeHours()}:${timeMinutes()}:${timeSeconds()}`
    roundTimeAdd();
}, 1000)