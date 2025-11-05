'use strict'
class Laser extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(x, y, deg);
        this.name = 'Laser Projectile';
        this.width = 80;
        this.height = 80;
        this.sprite.src = './Images/Sprites/laser-sprites/33.png';
        this.baseSpeed = 1;
        this.speed = this.baseSpeed;
        this.life = 2000;
        this.health = 0;
        this.energy = 0;
        this.size = 1;
        this.cruiser = cruiser;
        setInterval(() => {
            this.moveForward();
        }, 1);
        setTimeout(() => {
            entitiesList.delete(this);
        }, this.life);
    };
    collide (collidingObject) {
        if (collidingObject.isCruiser) {
            collidingObject.cruiser.health -= 10;
            if (collidingObject.cruiser.health <= 0) {
                collidingObject.cruiser.kill();
            }
        }
        entitiesList.delete(this);
    }
}