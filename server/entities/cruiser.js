'use strict'
import { Laser } from './laser.js'
import { Entity } from './entity.js'
import { inDeg, inRad, sleep } from '../../shared/constants.js';
import { cruiserPartsListGet, cruiserPartsListAdd, cruiserPartsListDelete } from '../global_variables.js';
import { Cruiser__Part } from './cruiser__part.js'


export class Battlecruiser extends Entity {
    constructor(x = 0, y = 0, deg = 0) {
        super(x, y, deg);
        this.type = 'cruiser';
        this.player = null;
        this.width = 81;
        this.height = 118;
        // this.sprite.src = './Images/Sprites/battlecruiser.png';
        // this.thrusterSprite = new Image;
        // this.thrusterSprite.src = './Images/Sprites/laser-sprites/01.png';
        this.bow = new Cruiser__Bow(x, y, deg, this, 'bow');
        this.leftBow = new Cruiser__leftBow(x, y, deg, this, 'leftBow');
        this.rightBow = new Cruiser__rightBow(x, y, deg, this, 'rightBow');
        this.deck = new Cruiser__Deck(x, y, deg, this, 'deck');
        this.aft = new Cruiser__Aft(x, y, deg, this, 'aft');
        this.leftWing = new Cruiser__LeftWing(x, y, deg, this, 'leftWing');
        this.rightWing = new Cruiser__RightWing(x, y, deg, this, 'rightWing');
        this.shield = new Shield(x, y, deg, this, 'shield');
        this.isCruiser = true;
        this.maxEnergy = 300000;
        this.energy = 10000;
        this.shieldEnergyStored = 0;
        this.shieldEnergyAllocated = 5;
        this.shieldEnergyDraw = 5;
        this.shieldCapacity = this.shieldEnergyAllocated * 1000;
        this.shieldEnergyMax = 150000;
        this.lasersEnergyStored = 1000;
        this.lasersEnergyMax = 20000;
        this.lasersEnergyAllocated = 5;
        this.lasersEnergyDraw = 5;
        this.engineEnergyAllocated = 5;
        this.engineEnergyMax = 100;
        this.engineEnergyDraw = 5;
        this.generatorStrength = 300;
        this.baseSpeed = 1;
        this.isSpeedBoostOn = 0;
        this.speedTechLimit = 100;
        this.speedBoost = (this.speedTechLimit * (this.engineEnergyAllocated / this.engineEnergyMax));
        this.speed = this.acceleration * ((this.speedTechLimit * (this.engineEnergyAllocated / this.engineEnergyMax)) + (this.isSpeedBoostOn * this.speedBoost));
        this.maxSpeed = this.speedTechLimit * (this.engineEnergyAllocated / this.engineEnergyMax);
        this.accelerate();
    }
    updateSpeed() {
        this.maxSpeed = this.speedTechLimit * (this.engineEnergyAllocated / this.engineEnergyMax);
        this.speedBoost = this.speedTechLimit * (this.engineEnergyAllocated / this.engineEnergyMax);
        this.speed = this.acceleration * ((this.speedTechLimit * (this.engineEnergyAllocated / this.engineEnergyMax)) + (this.isSpeedBoostOn * this.speedBoost));
    }
    generateEnergy() {
        let generatedEnergy = this.generatorStrength;
        if (this.lasersEnergyStored < this.lasersEnergyMax) {
            this.lasersEnergyDraw = this.lasersEnergyAllocated;
            this.lasersEnergyStored += this.lasersEnergyDraw;
        } else {
            this.lasersEnergyStored = this.lasersEnergyMax;
            this.lasersEnergyDraw = 0;
        }
        if (this.shieldEnergyStored < this.shieldCapacity) {
            this.shieldEnergyDraw = this.shieldEnergyAllocated;
            this.shieldEnergyStored += this.shieldEnergyDraw;
            this.shield.restore();
            if (this.shieldEnergyStored > this.shieldCapacity) {
                this.shieldEnergyStored = this.shieldCapacity;
            }
        } else if (this.shieldEnergyStored > this.shieldCapacity) {
            let shieldEnergySurplus = Math.ceil((this.shieldEnergyStored - this.shieldCapacity) / 100, 0);
            this.shieldEnergyStored -= shieldEnergySurplus;
            this.shieldEnergyDraw = -shieldEnergySurplus * 0.75;
        } else {
            this.shieldEnergyStored = this.shieldCapacity;
            this.shieldEnergyDraw = this.shieldEnergyAllocated / 4;
            generatedEnergy += this.shieldEnergyDraw;
        }
        if (this.engineEnergyAllocated > 0) {
            this.engineEnergyDraw = this.engineEnergyAllocated * this.acceleration + (this.speedBoost * this.isSpeedBoostOn);
        } else {
            this.engineEnergyDraw = 0;
        }
        generatedEnergy -= this.lasersEnergyDraw + this.shieldEnergyDraw + this.engineEnergyDraw;
        this.energy += generatedEnergy;
        if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        }
        if (this.energy < 0) {
            this.shortCircuit();
        }
    }
    shortCircuit() {
        this.energy = 0;
        this.shieldEnergyAllocated = 0;
        this.lasersEnergyAllocated = 0;
        this.engineEnergyAllocated = 0;
        this.speed = this.baseSpeed * this.speedBoost * (this.engineEnergyAllocated / 100);
    }
    boostSpeed() {
        if (this.energy != undefined && this.energy > 0) {
            this.speed = this.acceleration * ((this.speedTechLimit * (this.engineEnergyAllocated / this.engineEnergyMax)) + (this.isSpeedBoostOn * (this.speedBoost)))
        } else {
            return;
        }
    }
    /* renderThrusters() {
        if (this.isSpeedBoostOn) {
            mapCtx.save();
            mapCtx.rotate(inRad(this.deg));
            mapCtx.drawImage(this.thrusterSprite, this.x * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.sin(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - (this.width / 2), 75 + this.x * (Math.round(((Math.cos(inRad(this.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - this.height / 2, this.width, this.height);
            // rotate() rotates canvas instead of sprite image, so need to account for that when drawing.
            mapCtx.restore();
        }
    } */
    shootLaser(targetX, targetY) {
        if (this.lasersEnergyStored < 200) {
            return;
        }
        this.lasersEnergyStored -= 200;
        let distance = (Math.sqrt(Math.pow(targetX - this.x, 2) + Math.pow(targetY - this.y, 2)));
        let degree = inDeg(Math.PI / 2 + Math.asin((targetY - this.y) / distance));
        if (targetX - this.x < 0) {
            degree = -degree;
        }
        // new Laser(this.x, this.y, degree, this);
    }
    kill() {
        if (this.isDead) {
            return;
        }
        this.isSpeedBoostOn = 0;
        this.isDead = true;
        this.energy = 0;
        /* setTimeout(() => {
            this.sprite.src = './Images/Sprites/explosion-sprites/Explosions pack/explosion-1-g/Sprites/frame1.png';
        }, 100);
        setTimeout(() => {
            this.sprite.src = './Images/Sprites/explosion-sprites/Explosions pack/explosion-1-g/Sprites/frame2.png';
        }, 500);
        setTimeout(() => {
            this.sprite.src = './Images/Sprites/explosion-sprites/Explosions pack/explosion-1-g/Sprites/frame3.png';
        }, 1000);
        setTimeout(() => {
            this.sprite.src = './Images/Sprites/explosion-sprites/Explosions pack/explosion-1-g/Sprites/frame4.png';
        }, 1500);
        setTimeout(() => {
            this.sprite.src = './Images/Sprites/explosion-sprites/Explosions pack/explosion-1-g/Sprites/frame5.png';
        }, 2000);
        setTimeout(() => {
            this.sprite.src = './Images/Sprites/explosion-sprites/Explosions pack/explosion-1-g/Sprites/frame6.png';
        }, 2500); */
        setTimeout(() => {
            // this.sprite.src = './Images/Sprites/empty.png';
            entitiesList.delete(this.bow);
            entitiesList.delete(this.leftBow);
            entitiesList.delete(this.rightBow);
            entitiesList.delete(this.deck);
            entitiesList.delete(this.aft);
            entitiesList.delete(this.leftWing);
            entitiesList.delete(this.rightWing);
            entitiesList.delete(this);
        }, 3000);
        if (controlledEntity == this) {
            controlledEntity = null;
        }
    }
}
class Shield extends Cruiser__Part {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg, 70, cruiser, 'shield');
    }
    updateCoordinates() {
        this.x = this.cruiser.x;
        this.y = this.cruiser.y;
    }
    /* render() {
        mapCtx.beginPath();
        mapCtx.strokeStyle = 'blue';
        if (this.size > 10) {
            mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            if (this.cruiser.shieldEnergyStored > 10000) {
                mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
            }
            if (this.cruiser.shieldEnergyStored > 20000) {
                mapCtx.arc(this.x, this.y, this.size - 4, 0, 2 * Math.PI);
            }
        }
        mapCtx.closePath();
        mapCtx.stroke();
    } */
    restore() {
        if (this.cruiser.shieldEnergyStored > this.cruiser.shieldCapacity * 0.2) {
            this.size = 70;
        }
    }
    tryTurnOff() {
        if (this.cruiser.shieldEnergyStored <= 0) {
            this.cruiser.shieldEnergyStored = 0;
            this.size = 4;
        }
    }
    collide(collidingObject) {
        if (collidingObject.isCruiser) {
            this.cruiser.shieldEnergyStored -= 1000;
            this.tryTurnOff();
            if (this.cruiser.x > collidingObject.cruiser.x) {
                this.cruiser.x++;
            } else {
                this.cruiser.x--;
            }
            if (this.cruiser.y > collidingObject.cruiser.y) {
                this.cruiser.y++;
            } else {
                this.cruiser.y--;
            }
        }
        /* mapCtx.strokeStyle = 'cyan';
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.globalAlpha = 0.25;
        mapCtx.fill();
        mapCtx.strokeStyle = 'white';
        mapCtx.globalAlpha = 1; */
    }
}
class Cruiser__Bow extends Cruiser__Part {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg, 13, cruiser, 'bow');
    }
    updateCoordinates() {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
}

class Cruiser__leftBow extends Cruiser__Part {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg, 10, cruiser, 'leftBow');
    }
    updateCoordinates() {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg - 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg - 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
}
class Cruiser__rightBow extends Cruiser__Part {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg, 10, cruiser, 'rightBow');
    }
    updateCoordinates() {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg + 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg + 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
}


class Cruiser__Deck extends Cruiser__Part {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg, 18, cruiser, 'deck');
    }
    updateCoordinates() {
        this.x = this.cruiser.x - this.cruiser.height / 10 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 10 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
}

class Cruiser__Aft extends Cruiser__Part {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg, 20, cruiser, 'aft');
    }
    updateCoordinates() {
        this.x = this.cruiser.x + this.cruiser.height / 4 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y + this.cruiser.height / 4 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
}
class Cruiser__LeftWing extends Cruiser__Part {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg, 15, cruiser, 'leftWing');
    }
    updateCoordinates() {
        this.x = this.cruiser.x + this.cruiser.height / 3.15 * (Math.round(((Math.cos(inRad(this.cruiser.deg + 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y + this.cruiser.height / 3.15 * (Math.round(((Math.sin(inRad(this.cruiser.deg + 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
}
class Cruiser__RightWing extends Cruiser__Part {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg, 15, cruiser, 'rightWing');
    }
    updateCoordinates() {
        this.x = this.cruiser.x + this.cruiser.height / 3.15 * (Math.round(((Math.cos(inRad(this.cruiser.deg - 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y + this.cruiser.height / 3.15 * (Math.round(((Math.sin(inRad(this.cruiser.deg - 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
}
