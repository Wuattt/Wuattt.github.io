'use strict'

let wKeyPressed = false;
let sKeyPressed = false;
let aKeyPressed = false;
let dKeyPressed = false;
let qKeyPressed = false;
let eKeyPressed = false;
let shiftKeyPressed = false;
let isConsoleOpen = false;
let isControlPanelOpen = true;

let controlledEntity = dragon;


/* const whichKeyPressed = (subject) => {
    console.log(subject);
} */


$(document).on("keydown", async function (event) {
    // whichKeyPressed(event.which);
    switch (event.which) {
        case 87: // w key
            if (controlledEntity && isConsoleOpen == false && wKeyPressed != true) {
                wKeyPressed = true;
                while (controlledEntity && wKeyPressed) {
                    if (controlledEntity.moveForward != undefined) {
                        controlledEntity.moveForward();
                    }
                    await sleep(10);
                }
            }
            break;
        case 83: // s key
            if (controlledEntity && isConsoleOpen == false && sKeyPressed != true) {
                sKeyPressed = true;
                while (controlledEntity && sKeyPressed) {
                    if (controlledEntity.moveBackwards != undefined) {
                        controlledEntity.moveBackwards();
                    }
                    await sleep(10);
                }
            }
            break;
        case 65: // a key
            if (controlledEntity && isConsoleOpen == false && aKeyPressed != true) {
                aKeyPressed = true;
                while (controlledEntity && aKeyPressed) {
                    if (controlledEntity.rotateLeft != undefined) {
                        controlledEntity.rotateLeft();
                    }
                    await sleep(10);
                }
            }
            break;
        case 68: // d key
            if (controlledEntity && isConsoleOpen == false && dKeyPressed != true) {
                dKeyPressed = true;
                while (controlledEntity && dKeyPressed) {
                    if (controlledEntity.rotateRight != undefined) {
                        controlledEntity.rotateRight();
                    }
                    await sleep(10);
                }
            }
            break;
        case 81: // q key
            if (controlledEntity && isConsoleOpen == false && qKeyPressed != true) {
                qKeyPressed = true;
                while (controlledEntity && qKeyPressed) {
                    if (controlledEntity.strafeLeft != undefined) {
                        controlledEntity.strafeLeft();
                    }
                    await sleep(10);
                }
            }
            break;
        case 69: // e key
            if (controlledEntity && isConsoleOpen == false && eKeyPressed != true) {
                eKeyPressed = true;
                while (controlledEntity && eKeyPressed) {
                    if (controlledEntity.strafeRight != undefined) {
                        controlledEntity.strafeRight();
                    }
                    await sleep(10);
                }
            }
            break;
        case 16: // shift key
            if (controlledEntity && isConsoleOpen == false && shiftKeyPressed != true) {
                controlledEntity.speedBoost = 2;
                shiftKeyPressed = true;
                controlledEntity.isSpeedBoostOn = true;
                while (controlledEntity && shiftKeyPressed) {
                    controlledEntity.boostSpeed();
                    await sleep(10);
                }
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
        case 16:
            shiftKeyPressed = false;
            if (controlledEntity) {
                controlledEntity.isSpeedBoostOn = false;
                controlledEntity.speed = controlledEntity.baseSpeed * (controlledEntity.engineEnergyAllocated / 100);
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
        controlledEntity.shootLaser(clientX, clientY);
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
        controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
    }
    if (controlledEntity.engineEnergyAllocated > controlledEntity.engineEnergyMax) {
        controlledEntity.engineEnergyAllocated = controlledEntity.engineEnergyMax;
        controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
    }
});
$('#engineUP10').on('click', () => {
    if (controlledEntity) {
        controlledEntity.engineEnergyAllocated += 50;
        controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
    }
    if (controlledEntity.engineEnergyAllocated > controlledEntity.engineEnergyMax) {
        controlledEntity.engineEnergyAllocated = controlledEntity.engineEnergyMax;
        controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
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
        controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
    }
    if (controlledEntity.engineEnergyAllocated < 0) {
        controlledEntity.engineEnergyAllocated = 0;
        controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
    }
});
$('#engineDOWN10').on('click', () => {
    if (controlledEntity) {
        controlledEntity.engineEnergyAllocated -= 50;
        controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
    }
    if (controlledEntity.engineEnergyAllocated < 0) {
        controlledEntity.engineEnergyAllocated = 0;
        controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
    }
});