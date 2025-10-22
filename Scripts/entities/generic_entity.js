'use strict'
class Entity {
    constructor(x = 0, y = 0, deg = 0) {
        ++entityIdCounter;
        this.x = x;
        this.y = y;
        this.deg = deg;
        this.speed = 1;
        this.id = entityIdCounter;
        entitiesList.add(this);
        this.sprite = new Image();
        this.sprite.src = './Images/Sprites/missing-sprite.png';
        this.isCruiser = false;
    }
    updateCoordinates () {
        // this exists only for cruisers' parts updating coordinates
    }
    collide () {

    }
    render () {
        mapCtx.save();
        mapCtx.rotate(inRad(this.deg));
        mapCtx.drawImage(this.sprite, this.x * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.sin(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - (this.width / 2), this.x * (Math.round(((Math.cos(inRad(this.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - this.height / 2);
        // rotate() rotates canvas instead of sprite image, so need to account for that when drawing.
        mapCtx.restore();
        mapCtx.beginPath();
        mapCtx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white';
    }
    strafeLeft () {
        this.x += this.speed * (Math.round(((Math.cos(inRad(this.deg) - Math.PI + Number.EPSILON) * 1000))) / 1000);
        this.y += this.speed * (Math.round(((Math.sin(inRad(this.deg) - Math.PI + Number.EPSILON) * 1000))) / 1000);
    }
    strafeRight () {
        this.x -= this.speed * (Math.round(((Math.cos(inRad(this.deg) - Math.PI + Number.EPSILON) * 1000))) / 1000);
        this.y -= this.speed * (Math.round(((Math.sin(inRad(this.deg) - Math.PI + Number.EPSILON) * 1000))) / 1000);
    }
    moveForward () {
        this.x += this.speed * (Math.round(((Math.cos(inRad(this.deg) - Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y += this.speed * (Math.round(((Math.sin(inRad(this.deg) - Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    moveBackwards () {
        this.x -= this.speed * (Math.round(((Math.cos(inRad(this.deg) - Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
        this.y -= this.speed * (Math.round(((Math.sin(inRad(this.deg) - Math.PI / 2 + Number.EPSILON) * 1000))) / 1000);
    }
    rotateLeft () {
        this.deg -= 1;
    }
    rotateRight () {
        this.deg +=1;
    }
}