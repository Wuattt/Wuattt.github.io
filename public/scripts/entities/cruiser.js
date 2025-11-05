'use strict'
class Battlecruiser extends Entity {
    constructor(x = 0, y = 0, deg = 0) {
        super(x, y, deg);
        this.name = 'Cruiser';
        this.width = 81;
        this.height = 118;
        this.sprite.src = './Images/Sprites/battlecruiser.png';
        this.baseSpeed = 1;
        this.bow = new Cruiser__Bow(x, y, deg, this);
        this.leftBow = new Cruiser__leftBow(x, y, deg, this);
        this.rightBow = new Cruiser__rightBow(x, y, deg, this);
        this.deck = new Cruiser__Deck(x, y, deg, this);
        this.aft = new Cruiser__Aft(x, y, deg, this);
        this.leftWing = new Cruiser__LeftWing(x, y, deg, this);
        this.rightWing = new Cruiser__RightWing(x, y, deg, this);
        this.shield = new Shield(x, y, deg, this);
        this.isCruiser = true;
        this.isSpeedBoostOn = false;
        this.shieldEnergyStored = 0;
        this.shieldEnergyAllocated = 5;
        this.shieldEnergyDraw = 5;
        this.shieldCapacity = this.shieldEnergyAllocated * 1000;
        this.shieldEnergyMax = 150000;
        this.lasersEnergyStored = 1000;
        this.lasersEnergyMax = 20000;
        this.lasersEnergyAllocated = 5;
        this.lasersEnergyDraw = 5;
        this.engineEnergyAllocated = 100;
        this.engineEnergyMax = 100;
        this.engineEnergyDraw = 100;
        this.generatorStrength = 1000;
        this.speed = this.baseSpeed * (this.engineEnergyAllocated / 100);
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
            this.engineEnergyDraw = this.engineEnergyAllocated * this.speedBoost;
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
        controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
    }
    boostSpeed() {
        if (controlledEntity.energy != undefined && controlledEntity.energy > 0) {
            controlledEntity.speed = controlledEntity.baseSpeed * controlledEntity.speedBoost * (controlledEntity.engineEnergyAllocated / 100);
            controlledEntity.energy--;
        } else {
            controlledEntity.speed = controlledEntity.baseSpeed * (controlledEntity.engineEnergyAllocated / 100);
        }
    }
    renderThrusters() {
        if (this.isSpeedBoostOn) {
            mapCtx.save();
            mapCtx.rotate(inRad(this.deg));
            mapCtx.drawImage(cruiserThruster, this.x * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.sin(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - (this.width / 2), 75 + this.x * (Math.round(((Math.cos(inRad(this.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - this.height / 2, this.width, this.height);
            // rotate() rotates canvas instead of sprite image, so need to account for that when drawing.
            mapCtx.restore();
        }
    }
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
        let deg = degree;
        let id = this.id;
        socket.emit('shoot laser', deg, id);
    }
    kill() {
        if (this.isDead) {
            return;
        }
        this.isSpeedBoostOn = false;
        this.isDead = true;
        this.energy = 0;
        setTimeout(() => {
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
        }, 2500);
        setTimeout(() => {
            this.sprite.src = './Images/Sprites/empty.png';
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
class Shield extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.name = 'Cruiser Bow';
        this.x;
        this.y;
        this.size = 70;
        this.cruiser = cruiser;
        this.isCruiser = true;
    }
    updateCoordinates() {
        this.x = this.cruiser.x;
        this.y = this.cruiser.y;
    }
    render() {
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
    }
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
        mapCtx.strokeStyle = 'cyan';
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.globalAlpha = 0.25;
        mapCtx.fill();
        mapCtx.strokeStyle = 'white';
        mapCtx.globalAlpha = 1;
    }
}
class Cruiser__Bow extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.name = 'Cruiser Bow';
        this.x;
        this.y;
        this.size = 13;
        this.cruiser = cruiser;
        this.isCruiser = true;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates() {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render() {
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide(collidingObject) {
        if (collidingObject.isCruiser) {
            this.cruiser.health--;
            if (this.cruiser.health <= 0) {
                this.cruiser.kill();
            }
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
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}

class Cruiser__leftBow extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.name = 'Cruiser Left Bow';
        this.x;
        this.y;
        this.size = 10;
        this.cruiser = cruiser;
        this.isCruiser = true;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates() {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg - 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg - 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render() {
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide(collidingObject) {
        if (collidingObject.isCruiser) {
            this.cruiser.health--;
            if (this.cruiser.health <= 0) {
                this.cruiser.kill();
            }
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
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}
class Cruiser__rightBow extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.name = 'Cruiser Right Bow';
        this.x;
        this.y;
        this.size = 10;
        this.cruiser = cruiser;
        this.isCruiser = true;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates() {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg + 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg + 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render() {
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide(collidingObject) {
        if (collidingObject.isCruiser) {
            this.cruiser.health--;
            if (this.cruiser.health <= 0) {
                this.cruiser.kill();
            }
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
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}


class Cruiser__Deck extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.name = 'Cruiser Deck';
        this.x;
        this.y;
        this.size = 18;
        this.cruiser = cruiser;
        this.isCruiser = true;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates() {
        this.x = this.cruiser.x - this.cruiser.height / 10 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 10 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render() {
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide(collidingObject) {
        if (collidingObject.isCruiser) {
            this.cruiser.health--;
            if (this.cruiser.health <= 0) {
                this.cruiser.kill();
            }
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
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}

class Cruiser__Aft extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.name = 'Cruiser Aft';
        this.x;
        this.y;
        this.size = 20;
        this.cruiser = cruiser;
        this.isCruiser = true;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates() {
        this.x = this.cruiser.x + this.cruiser.height / 4 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y + this.cruiser.height / 4 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render() {
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide(collidingObject) {
        if (collidingObject.isCruiser) {
            this.cruiser.health--;
            if (this.cruiser.health <= 0) {
                this.cruiser.kill();
            }
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
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}
class Cruiser__LeftWing extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.name = 'Cruiser Left Wing';
        this.x;
        this.y;
        this.size = 15;
        this.cruiser = cruiser;
        this.isCruiser = true;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates() {
        this.x = this.cruiser.x + this.cruiser.height / 3.15 * (Math.round(((Math.cos(inRad(this.cruiser.deg + 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y + this.cruiser.height / 3.15 * (Math.round(((Math.sin(inRad(this.cruiser.deg + 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render() {
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide(collidingObject) {
        if (collidingObject.isCruiser) {
            this.cruiser.health--;
            if (this.cruiser.health <= 0) {
                this.cruiser.kill();
            }
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
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}
class Cruiser__RightWing extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.name = 'Cruiser Right Wing';
        this.x;
        this.y;
        this.size = 15;
        this.cruiser = cruiser;
        this.isCruiser = true;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates() {
        this.x = this.cruiser.x + this.cruiser.height / 3.15 * (Math.round(((Math.cos(inRad(this.cruiser.deg - 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y + this.cruiser.height / 3.15 * (Math.round(((Math.sin(inRad(this.cruiser.deg - 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render() {
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide(collidingObject) {
        if (collidingObject.isCruiser) {
            this.cruiser.health--;
            if (this.cruiser.health <= 0) {
                this.cruiser.kill();
            }
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
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}