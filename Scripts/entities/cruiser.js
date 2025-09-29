'use strict'
class Battlecruiser extends Entity {
    constructor(x = 0, y = 0, deg = 0) {
        super(x, y, deg);
        this.width = 81;
        this.height = 118;
        this.sprite.src = './Images/Sprites/battlecruiser.png';
        this.bow = new Cruiser__Bow;
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
        
    }
}

class Cruiser__Deck extends Entity {

}

class Cruiser__Aft extends Entity {

}