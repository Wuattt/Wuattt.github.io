'use strict'

let wKeyPressed = false;
let sKeyPressed = false;
let aKeyPressed = false;
let dKeyPressed = false;
let qKeyPressed = false;
let eKeyPressed = false;
let consoleIsOpen = false;


$(document).on("keydown", async function (event) {
    log(event.which);
    switch(event.which) {
        case 87:
            if (consoleIsOpen == false && wKeyPressed != true) {
                wKeyPressed = true;
                while(wKeyPressed) {
                    moveForward();
                    await sleep(10);
                }
            }
            break;
        case 83:
            if (consoleIsOpen == false && sKeyPressed != true) {
                sKeyPressed = true;
                while(sKeyPressed) {
                    moveBackwards();
                    await sleep(10);
                }
            }
            break;
        case 65:
            if (consoleIsOpen == false && aKeyPressed != true) {
                aKeyPressed = true;
                while(aKeyPressed) {
                    rotateLeft();
                    await sleep(10);
                }
            }
            break;
        case 68:
            if (consoleIsOpen == false && dKeyPressed != true) {
                dKeyPressed = true;
                while(dKeyPressed) {
                    rotateRight();
                    await sleep(10);
                }
            }
            break;
        case 81:
            if (consoleIsOpen == false && qKeyPressed != true) {
                qKeyPressed = true;
                while(qKeyPressed) {
                    strafeLeft();
                    await sleep(10);
                }
            }
            break;
        case 69:
            if (consoleIsOpen == false && eKeyPressed != true) {
                eKeyPressed = true;
                while(eKeyPressed) {
                    strafeRight();
                    await sleep(10);
                }
            }
            break;
        case 84: // t key
            if (consoleIsOpen == false) {
                openConsole();
            }
            break;
        case 27: // esc key
            if (consoleIsOpen == true) {
                closeConsole();
            }
            break;
    }
    
});


$(document).on("keyup", function (event) {
    switch(event.which) {
        case 65:
            aKeyPressed = false;
            break;
        case 68:
            dKeyPressed = false;
            break;
        case 87:
            wKeyPressed = false;
            break;  
        case 83:
            sKeyPressed = false;
            break;
        case 81:
            qKeyPressed = false;
            break;
        case 69:
            eKeyPressed = false;
            break;
        case 84: // t key
            if (consoleIsOpen == true) {
                $('#console input').focus();
            }
            break;
    }
});