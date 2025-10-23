'use strict'

let wKeyPressed = false;
let sKeyPressed = false;
let aKeyPressed = false;
let dKeyPressed = false;
let qKeyPressed = false;
let eKeyPressed = false;
let consoleIsOpen = false;

let controlledEntity = dragon;

/*
const whichKeyPressed = (subject) => {
    console.log(subject);
}
*/

$(document).on("keydown", async function (event) {
    // whichKeyPressed(event.which);
    switch(event.which) {
        case 87:
            if (consoleIsOpen == false && wKeyPressed != true) {
                wKeyPressed = true;
                while(wKeyPressed) {
                    if (controlledEntity.moveForward != undefined) {
                        controlledEntity.moveForward();
                    }
                    await sleep(10);
                }
            }
            break;
        case 83:
            if (consoleIsOpen == false && sKeyPressed != true) {
                sKeyPressed = true;
                while(sKeyPressed) {
                    if (controlledEntity.moveBackwards != undefined) {
                        controlledEntity.moveBackwards();
                    }
                    await sleep(10);
                }
            }
            break;
        case 65:
            if (consoleIsOpen == false && aKeyPressed != true) {
                aKeyPressed = true;
                while(aKeyPressed) {
                    if (controlledEntity.rotateLeft != undefined) {
                        controlledEntity.rotateLeft();
                    }
                    await sleep(10);
                }
            }
            break;
        case 68:
            if (consoleIsOpen == false && dKeyPressed != true) {
                dKeyPressed = true;
                while(dKeyPressed) {
                    if (controlledEntity.rotateRight != undefined) {
                        controlledEntity.rotateRight();
                    }
                    await sleep(10);
                }
            }
            break;
        case 81:
            if (consoleIsOpen == false && qKeyPressed != true) {
                qKeyPressed = true;
                while(qKeyPressed) {
                    if (controlledEntity.strafeLeft != undefined) {
                        controlledEntity.strafeLeft();
                    }
                    await sleep(10);
                }
            }
            break;
        case 69:
            if (consoleIsOpen == false && eKeyPressed != true) {
                eKeyPressed = true;
                while(eKeyPressed) {
                    if (controlledEntity.strafeRight != undefined) {
                        controlledEntity.strafeRight();
                    }
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

$('canvas').on('click', (event) => {
    let distance = (Math.sqrt(Math.pow(event.clientX - controlledEntity.x, 2) + Math.pow(event.clientY - controlledEntity.y, 2)));
    let degree = inDeg(Math.PI / 2 + Math.asin((event.clientY - controlledEntity.y) / distance)); // TODO: shoot lasers at position of cursor
    if (event.clientX - controlledEntity.x < 0) {
        degree = -degree;
    }
    new Laser(controlledEntity.x, controlledEntity.y, degree); 
})