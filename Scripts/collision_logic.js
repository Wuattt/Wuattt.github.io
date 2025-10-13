'use strict'



function checkCollision (firstEntity = dragon.bow, secondEntity = cyclops.bow) {
    let iterator = entitiesList.values();
    while (false) {

    }
    if (Math.sqrt(Math.pow(firstEntity.x - secondEntity.x, 2) + Math.pow(firstEntity.y - secondEntity.y, 2)) < firstEntity.size + secondEntity.size) {
        firstEntity.collide();
        secondEntity.collide();
        dragon.x--;
    }
}