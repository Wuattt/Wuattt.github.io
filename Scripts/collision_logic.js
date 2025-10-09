'use strict'


function checkCollision () {
    if (
        Math.sqrt(Math.pow(dragon.bow.x - cyclops.bow.x, 2) + Math.pow(dragon.bow.y - cyclops.bow.y, 2)) < dragon.bow.size + cyclops.bow.size
    ) {
        dragon.bow.collide();
        cyclops.bow.collide();
    }
}