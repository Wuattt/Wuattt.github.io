'use strict'
class Laser extends Entity {
    constructor(x = 0, y = 0, deg = 0) {
        super(x, y, deg);
        this.width = 80;
        this.height = 80;
        this.sprite.src = './Images/Sprites/laser-sprites/33.png';
        this.life = 2000;
        this.health = 0;
        setInterval(() => {
            this.moveForward();
        }, 1);
        setTimeout(() => {
            entitiesList.delete(this);
        }, this.life);
    };
}