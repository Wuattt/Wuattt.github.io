'use strict'
class Battlecruiser extends Entity {
    constructor(x = 0, y = 0, deg = 0) {
        super(x, y, deg);
        this.width = 81;
        this.height = 118;
        this.sprite.src = './Images/Sprites/battlecruiser.png';
        this.bow = new Cruiser__Bow(x, y, deg, this);
    }
}

class Cruiser__Bow extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.x;
        this.y;
        this.size = 13;
        this.cruiser = cruiser;
        this.sprite.src = './Images/Sprites/red-border.png';
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    render () {
        this.x = this.cruiser.x - this.cruiser.height / 2.65 * (Math.round(((Math.cos(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y = this.cruiser.y - this.cruiser.height / 2.65 * (Math.round(((Math.sin(inRad(this.cruiser.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, 13, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    }
}

class Cruiser__Deck extends Entity {

}

class Cruiser__Aft extends Entity {

}