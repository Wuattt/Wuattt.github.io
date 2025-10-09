'use strict'
class Battlecruiser extends Entity {
    constructor(x = 0, y = 0, deg = 0) {
        super(x, y, deg);
        this.width = 81;
        this.height = 118;
        this.sprite.src = './Images/Sprites/battlecruiser.png';
        this.bow = new Cruiser__Bow(x, y, deg);
    }
}

class Cruiser__Bow extends Entity {
    constructor(x = 0, y = 0, deg = 0) {
        super(x, y, deg);
        this.width = 81;
        this.height = 118;
        this.sprite.src = './Images/Sprites/red-border.png';
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    render () {
        mapCtx.save();
        mapCtx.rotate(inRad(this.deg));
        mapCtx.beginPath();
        mapCtx.arc(this.width / 2 + this.x * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.sin(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - (this.width / 2), this.x * (Math.round(((Math.cos(inRad(this.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - this.height / 2.65, 13, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.restore();
    }
}

class Cruiser__Deck extends Entity {

}

class Cruiser__Aft extends Entity {

}