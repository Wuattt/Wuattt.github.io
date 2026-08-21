import { Entity } from './entity.js'
import { cruiserPartsListAdd } from '../global_variables.js'

export class Cruiser__Part extends Entity {
    constructor(x = 0, y = 0, deg = 0, size = 1, cruiser, cruiserPart) {
        super(cruiser.x, cruiser.y, cruiser.deg);
        this.size = size;
        this.type = 'cruiser_part';
        cruiserPartsListAdd(this);
        this.cruiserPart = cruiserPart;
        this.cruiser = cruiser;
        this.isCruiser = true;
    }
    // TODO: rendering of specific cruiser parts, for testing, to implement collision
    /* render() {
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
    } */
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
        /* mapCtx.strokeStyle = 'red';
        mapCtx.beginPath();
        // mapCtx.arc(this.x, this.y, this.size - 2, 0, 2 * Math.PI);
        mapCtx.closePath();
        mapCtx.stroke();
        mapCtx.strokeStyle = 'white'; */
    }
}