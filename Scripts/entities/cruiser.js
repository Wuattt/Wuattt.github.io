'use strict'
class Battlecruiser extends Entity {
    constructor(x = 0, y = 0, deg = 0) {
        super(x, y, deg);
        this.width = 81;
        this.height = 118;
        this.sprite.src = './Images/Sprites/battlecruiser.png';
    }
}

class Cruiser__Bow extends Battlecruiser {
    
}

class Cruiser__Deck extends Battlecruiser {

}

class Cruiser__Aft extends Battlecruiser {

}