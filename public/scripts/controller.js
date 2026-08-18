'use strict'
import { dragon, cyclops} from '/scripts/init.js'
import { openConsole, closeConsole, isConsoleOpen, isControlPanelOpen } from '/scripts/console_commands.js'
import { socket } from '/scripts/multiplayer.js';


let wKeyPressed = false;
let sKeyPressed = false;
let aKeyPressed = false;
let dKeyPressed = false;
let qKeyPressed = false;
let eKeyPressed = false;
let shiftKeyPressed = false;


export let controlledEntity = dragon;
let x = controlledEntity.x;
let y = controlledEntity.y;
let deg = controlledEntity.deg;
let id = controlledEntity.id;

/* const whichKeyPressed = (subject) => {
    console.log(subject);
} */


$(document).on("keydown", async function (event) {
    // whichKeyPressed(event.which);
    switch (event.which) {
        case 87: // w key
            if (controlledEntity && isConsoleOpen == false && wKeyPressed != true) {
                wKeyPressed = true;
                x = controlledEntity.x;
                y = controlledEntity.y;
                id = controlledEntity.id;
                socket.emit('moveForward', x, y, id);
            }
            break;
        case 83: // s key
            if (controlledEntity && isConsoleOpen == false && sKeyPressed != true) {
                sKeyPressed = true;
                x = controlledEntity.x;
                y = controlledEntity.y;
                id = controlledEntity.id;
                socket.emit('moveBackwards', x, y, id);
            }
            break;
        case 65: // a key
            if (controlledEntity && isConsoleOpen == false && aKeyPressed != true) {
                aKeyPressed = true;
                deg = controlledEntity.deg;
                id = controlledEntity.id;
                socket.emit('rotateLeft', deg, id)
            }
            break;
        case 68: // d key
            if (controlledEntity && isConsoleOpen == false && dKeyPressed != true) {
                dKeyPressed = true;
                deg = controlledEntity.deg;
                id = controlledEntity.id;
                socket.emit('rotateRight', deg, id)
            }
            break;
        case 81: // q key
            if (controlledEntity && isConsoleOpen == false && qKeyPressed != true) {
                qKeyPressed = true;
                x = controlledEntity.x;
                y = controlledEntity.y;
                id = controlledEntity.id;
                socket.emit('strafeLeft', x, y, id);
            }
            break;
        case 69: // e key
            if (controlledEntity && isConsoleOpen == false && eKeyPressed != true) {
                eKeyPressed = true;
                x = controlledEntity.x;
                y = controlledEntity.y;
                id = controlledEntity.id;
                socket.emit('strafeRight', x, y, id)
            }
            break;
        case 16: // shift key
            if (controlledEntity && isConsoleOpen == false && shiftKeyPressed != true) {
                shiftKeyPressed = true;
                socket.emit('engineBoostOn', id);
            }
            break;
        case 193: // ` key
            if (isConsoleOpen == false) {
                // TODO: change view from outside view to inside
            }
            break;
        case 221: // ] key (cheats)
            if (controlledEntity && isConsoleOpen == false) {
                controlledEntity.energy = controlledEntity.maxEnergy;
                controlledEntity.health = controlledEntity.maxHealth;
                controlledEntity.shieldEnergyStored = controlledEntity.shieldCapacity;
            }
            break;
        case 32: // space key
            if (controlledEntity && isConsoleOpen == false && isControlPanelOpen) {
                control_panel.style.display = 'none';
                isControlPanelOpen = false;
            } else {
                control_panel.style.display = 'block';
                isControlPanelOpen = true;
            }
            break;
        case 84: // t key
            if (isConsoleOpen == false) {
                openConsole();
            }
            break;
        case 13: // enter key
            if (isConsoleOpen == false) {
                openConsole();
            }
            break;
        case 191: // '/' key
            if (isConsoleOpen == false) {
                openConsole();
                $('#console input')[0].value = '/';
            }
            break;
        case 27: // esc key
            if (isConsoleOpen == true) {
                closeConsole();
            }
            break;
    }

});


$(document).on("keyup", function (event) {
    switch (event.which) {
        case 65:
            aKeyPressed = false;
            deg = controlledEntity.deg;
            id = controlledEntity.id;
            socket.emit('rotateLeftStop', id);
            break;
        case 68:
            dKeyPressed = false;
            deg = controlledEntity.deg;
            id = controlledEntity.id;
            socket.emit('rotateRightStop', id);
            break;
        case 87:
            wKeyPressed = false;
            x = controlledEntity.x;
            y = controlledEntity.y;
            id = controlledEntity.id;
            socket.emit('moveForwardStop', id);
            break;
        case 83:
            sKeyPressed = false;
            x = controlledEntity.x;
            y = controlledEntity.y;
            id = controlledEntity.id;
            socket.emit('moveBackwardsStop', id);
            break;
        case 81:
            qKeyPressed = false;
            x = controlledEntity.x;
            y = controlledEntity.y;
            id = controlledEntity.id;
            socket.emit('strafeLeftStop', id);
            break;
        case 69:
            eKeyPressed = false;
            x = controlledEntity.x;
            y = controlledEntity.y;
            id = controlledEntity.id;
            socket.emit('strafeRightStop', id);
            break;
        case 16:
            shiftKeyPressed = false;
            if (controlledEntity) {
                id = controlledEntity.id;
                socket.emit('engineBoostOff', id)
            }
            break;
        case 84: // t key
            if (isConsoleOpen == true) {
                $('#console input').focus();
            }
            break;
        case 13: // enter key
            if (isConsoleOpen == true) {
                $('#console input').focus();
            }
            break;
        case 191: // '/' key
            if (isConsoleOpen == true) {
                $('#console input').focus();
            }
            break;
    }
});

// shooting lasers
$('canvas').on('click', (event) => {
    if (controlledEntity) {
        let clientX = event.clientX;
        let clientY = event.clientY;
        let id = controlledEntity.id;
        socket.emit('shoot laser', clientX, clientY, id);
    }
})
// powering up
$('#lasersUP').on('click', () => {
    if (controlledEntity) {
        controlledEntity.lasersEnergyAllocated += 5;
    }
});
$('#lasersUP10').on('click', () => {
    if (controlledEntity) {
        controlledEntity.lasersEnergyAllocated += 50;
    }
});
$('#shieldUP').on('click', () => {
    if (controlledEntity) {
        if (controlledEntity.shieldCapacity >= controlledEntity.shieldEnergyMax) {
            return;
        }
        controlledEntity.shieldEnergyAllocated += 5;
        controlledEntity.shieldCapacity = controlledEntity.shieldEnergyAllocated * 1000;
    }
});
$('#shieldUP10').on('click', () => {
    if (controlledEntity) {
        controlledEntity.shieldEnergyAllocated += 50;
        controlledEntity.shieldCapacity = controlledEntity.shieldEnergyAllocated * 1000;
        if (controlledEntity.shieldCapacity >= controlledEntity.shieldEnergyMax) {
            controlledEntity.shieldEnergyAllocated = controlledEntity.shieldEnergyMax / 1000;
            controlledEntity.shieldCapacity = controlledEntity.shieldEnergyAllocated * 1000;
        }
    }
});
$('#engineUP').on('click', () => {
    if (controlledEntity) {
        controlledEntity.engineEnergyAllocated += 5;
        controlledEntity.updateSpeed();
    }
    if (controlledEntity.engineEnergyAllocated > controlledEntity.engineEnergyMax) {
        controlledEntity.engineEnergyAllocated = controlledEntity.engineEnergyMax;
        controlledEntity.updateSpeed();
    }
});
$('#engineUP10').on('click', () => {
    if (controlledEntity) {
        controlledEntity.engineEnergyAllocated += 50;
        controlledEntity.updateSpeed();
    }
    if (controlledEntity.engineEnergyAllocated > controlledEntity.engineEnergyMax) {
        controlledEntity.engineEnergyAllocated = controlledEntity.engineEnergyMax;
        controlledEntity.updateSpeed();
    }
});
// powering down
$('#lasersDOWN').on('click', () => {
    if (controlledEntity) {
        controlledEntity.lasersEnergyAllocated -= 5;
    }
    if (controlledEntity.lasersEnergyAllocated < 0) {
        controlledEntity.lasersEnergyAllocated = 0;
    }
});
$('#lasersDOWN10').on('click', () => {
    if (controlledEntity) {
        controlledEntity.lasersEnergyAllocated -= 50;
    }
    if (controlledEntity.lasersEnergyAllocated < 0) {
        controlledEntity.lasersEnergyAllocated = 0;
    }
});
$('#shieldDOWN').on('click', () => {
    if (controlledEntity) {
        controlledEntity.shieldEnergyAllocated -= 5;
        controlledEntity.shieldCapacity = controlledEntity.shieldEnergyAllocated * 1000;
    }
    if (controlledEntity.shieldEnergyAllocated < 0) {
        controlledEntity.shieldEnergyAllocated = 0;
        controlledEntity.shieldCapacity = controlledEntity.shieldEnergyAllocated * 1000;
    }
});
$('#shieldDOWN10').on('click', () => {
    if (controlledEntity) {
        controlledEntity.shieldEnergyAllocated -= 50;
        controlledEntity.shieldCapacity = controlledEntity.shieldEnergyAllocated * 1000;
    }
    if (controlledEntity.shieldEnergyAllocated < 0) {
        controlledEntity.shieldEnergyAllocated = 0;
        controlledEntity.shieldCapacity = controlledEntity.shieldEnergyAllocated * 1000;
    }
});
$('#engineDOWN').on('click', () => {
    if (controlledEntity) {
        controlledEntity.engineEnergyAllocated -= 5;
        controlledEntity.updateSpeed();
    }
    if (controlledEntity.engineEnergyAllocated < 0) {
        controlledEntity.engineEnergyAllocated = 0;
        controlledEntity.updateSpeed();
    }
});
$('#engineDOWN10').on('click', () => {
    if (controlledEntity) {
        controlledEntity.engineEnergyAllocated -= 50;
        controlledEntity.updateSpeed();
    }
    if (controlledEntity.engineEnergyAllocated < 0) {
        controlledEntity.engineEnergyAllocated = 0;
        controlledEntity.updateSpeed();
    }
});