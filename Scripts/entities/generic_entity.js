'use strict'
class Entity {
    constructor(x = 0, y = 0, deg = 0) {
        ++entityIdCounter;
        this.name = 'Generic Entity';
        this.x = x;
        this.y = y;
        this.deg = deg;
        this.speed = 1;
        this.id = entityIdCounter;
        entitiesList.add(this);
        this.sprite = new Image();
        this.sprite.src = './Images/Sprites/missing-sprite.png';
        this.isCruiser = false;
        this.maxHealth = 100;
        this.health = 100;
        this.maxEnergy = 100;
        this.energy = 50;
        this.isDead = false;
    }
    updateCoordinates () {
        // this exists only for cruisers' parts updating coordinates
    }
    collide () {

    }
    kill () {
        
    }
    generateEnergy () {
        
    }
    render () {
        mapCtx.save();
        mapCtx.rotate(inRad(this.deg));
        mapCtx.drawImage(this.sprite, this.x * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.sin(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - (this.width / 2), this.x * (Math.round(((Math.cos(inRad(this.deg) + Math.PI / 2 + Number.EPSILON) * 1000))) / 1000) + this.y * (Math.round(((Math.cos(inRad(this.deg) + Number.EPSILON) * 1000))) / 1000) - this.height / 2, this.width, this.height);
        // rotate() rotates canvas instead of sprite image, so need to account for that when drawing.
        mapCtx.restore();
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, 3, 0, 2 * Math.PI); // exact coordinates for testing
        mapCtx.closePath();
        mapCtx.stroke();
        if (this.health <= 0) {
            this.health = 0;
        } else if (this.health > this.maxHealth * 0.5) {
            mapCtx.fillStyle = 'green';
        } else if (this.health > this.maxHealth * 0.25) {
            mapCtx.fillStyle = 'yellow';
        } else {
            mapCtx.fillStyle = 'red';
        }
        mapCtx.fillRect(this.x - 30, this.y + 15, 60 * (this.health / this.maxHealth), 10);
        mapCtx.fillStyle = 'blue';
        mapCtx.fillRect(this.x - 30, this.y + 25, 60 * (this.energy / this.maxEnergy), 10);
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