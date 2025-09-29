'use strict'
class Entity {
    constructor(x = 0, y = 0, deg = 0) {
        ++entityIdCounter;
        this.x = x;
        this.y = y;
        this.deg = deg;
        this.id = entityIdCounter;
        entitiesList.add(this);
        this.sprite = new Image();
        this.sprite.src = './Images/Sprites/missing-sprite.png';
        this.sprite.onload = update();
    }
    render () {
        mapCtx.save();
        mapCtx.rotate(inRad(this.deg));
        mapCtx.drawImage(this.sprite, this.x * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.sin(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - (this.width / 2), this.x * (Math.round(((Math.cos(inRad(this.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - this.height / 2);
        // rotate() rotates canvas instead of sprite image, so need to account for that when drawing.
        mapCtx.strokeRect(this.width / 6 + this.x * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.sin(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - (this.width / 2), this.x * (Math.round(((Math.cos(inRad(this.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - this.height / 2, this.width / 1.5, this.height / 4);
        mapCtx.restore();
        mapCtx.strokeRect(this.x, this.y, 5, 5);
        mapCtx.strokeStyle = 'red';
    }
}