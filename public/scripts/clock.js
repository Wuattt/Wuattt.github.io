'use strict'

const timeCountOne = () => {
    let timeHours = () => (roundTime / 3600) < 10 ? `0${Math.floor(roundTime / 3600)}` : Math.floor(roundTime / 3600);
    let timeMinutes = () => (roundTime / 60 % 60) < 10 ? `0${Math.floor(roundTime / 60 % 60)}` : Math.floor(roundTime / 60 % 60);
    let timeSeconds = () => (roundTime % 60) < 10 ? `0${roundTime % 60}` : roundTime % 60;
    timerElem.innerHTML = `${timeHours()}:${timeMinutes()}:${timeSeconds()}`
    roundTime++;
}