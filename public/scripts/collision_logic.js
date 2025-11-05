'use strict'


function checkAllCollisions() {
    let entities = Array.from(entitiesList);
    for (let i = 0; i < entities.length; i++) {
        for (let j = 0; j < entities.length; j++) {
            checkCollision(entities[i], entities[j]);
        }
    };
}
function checkCollision (firstEntity = dragon.bow, secondEntity = cyclops.bow) {
    if ((firstEntity.cruiser != secondEntity.cruiser) && (Math.sqrt(Math.pow(firstEntity.x - secondEntity.x, 2) + Math.pow(firstEntity.y - secondEntity.y, 2)) < firstEntity.size + secondEntity.size)) {
        firstEntity.collide(secondEntity);
        secondEntity.collide(firstEntity);
    }
}