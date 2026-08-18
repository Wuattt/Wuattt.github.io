'use strict'
import { socket } from '/scripts/multiplayer.js';


export class Laser extends Entity {
    constructor(x = 0, y = 0, deg = 0, cruiser) {
        super(x, y, deg);
        this.name = 'Laser Projectile';
        this.width = 80;
        this.height = 80;
        this.sprite.src = './Images/Sprites/laser-sprites/33.png';
        this.baseSpeed = 2;
        this.speed = this.baseSpeed;
        this.momentumAlong = this.baseSpeed *  this.speed;
        this.life = 2000;
        this.health = 0;
        this.energy = 0;
        this.size = 1;
        this.cruiser = cruiser;
        this.moveForward();
        setTimeout(() => {
            this.kill();
        }, this.life);
    };
    collide (collidingObject) {
        if (collidingObject instanceof Shield) {
            collidingObject.cruiser.shieldEnergyStored -= 2000;
            collidingObject.tryTurnOff();
        } else if (collidingObject.isCruiser) {
                collidingObject.cruiser.health -= 10;
                collidingObject.cruiser.tryKill();
        }
        this.kill();
    }
    kill () {
        clearInterval(this.fly);
        socket.emit('kill', this.id);
        entitiesList.delete(this);
    }
}