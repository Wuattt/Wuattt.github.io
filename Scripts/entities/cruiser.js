'use strict'
class Battlecruiser extends Entity {
    constructor(x = 0, y = 0, deg = 0) {
        super(x, y, deg);
        this.width = 81;
        this.height = 118;
        this.sprite.src = './Images/Sprites/battlecruiser.png';
        this.bow = new Cruiser__Bow(x, y, deg, this);
        this.leftBow = new Cruiser__leftBow(x, y, deg, this);
        this.rightBow = new Cruiser__rightBow(x, y, deg, this);
        this.deck = new Cruiser__Deck(x, y, deg, this);
        this.aft = new Cruiser__Aft(x, y, deg, this);
        this.leftWing = new Cruiser__LeftWing(x, y, deg, this);
        this.rightWing = new Cruiser__RightWing(x, y, deg, this);
    }
}

class Cruiser__Bow extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.x;
        this.y;
        this.size = 13;
        this.cruiser = cruiser;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates () {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render () {
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide () {
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}
class Cruiser__leftBow extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.x;
        this.y;
        this.size = 10;
        this.cruiser = cruiser;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates () {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg - 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg - 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render () {
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide () {
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}
class Cruiser__rightBow extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.x;
        this.y;
        this.size = 10;
        this.cruiser = cruiser;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates () {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg + 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg + 30) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render () {
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide () {
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}


class Cruiser__Deck extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.x;
        this.y;
        this.size = 18;
        this.cruiser = cruiser;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates () {
        this.x = this.cruiser.x - this.cruiser.height / 10 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 10 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render () {
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide () {
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}

class Cruiser__Aft extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.x;
        this.y;
        this.size = 20;
        this.cruiser = cruiser;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates () {
        this.x = this.cruiser.x + this.cruiser.height / 4 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y + this.cruiser.height / 4 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render () {
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide () {
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}
class Cruiser__LeftWing extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.x;
        this.y;
        this.size = 15;
        this.cruiser = cruiser;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates () {
        this.x = this.cruiser.x + this.cruiser.height / 3.15 * (Math.round(((Math.cos(inRad(this.cruiser.deg + 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y + this.cruiser.height / 3.15 * (Math.round(((Math.sin(inRad(this.cruiser.deg + 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render () {
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide () {
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}
class Cruiser__RightWing extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.x;
        this.y;
        this.size = 15;
        this.cruiser = cruiser;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    updateCoordinates () {
        this.x = this.cruiser.x + this.cruiser.height / 3.15 * (Math.round(((Math.cos(inRad(this.cruiser.deg - 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y + this.cruiser.height / 3.15 * (Math.round(((Math.sin(inRad(this.cruiser.deg - 45) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    render () {
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
    collide () {
        mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
}