'use strict'


let dragon_parts = [dragon.bow, dragon.leftBow, dragon.rightBow, dragon.deck, dragon.aft, dragon.leftWing, dragon.rightWing];
let cyclops_parts = [cyclops.bow, cyclops.leftBow, cyclops.rightBow, cyclops.deck, cyclops.aft, cyclops.leftWing, cyclops.rightWing];

function checkAllCollisions() {
    for (let i = 0; i < dragon_parts.length; i++) {
        for (let j = 0; j < cyclops_parts.length; j++) {
            checkCollision(dragon_parts[i], cyclops_parts[j]);
        }
    };
}
function checkCollision (firstEntity = dragon.bow, secondEntity = cyclops.bow) {
    if (Math.sqrt(Math.pow(firstEntity.x - secondEntity.x, 2) + Math.pow(firstEntity.y - secondEntity.y, 2)) < firstEntity.size + secondEntity.size) {
        firstEntity.collide(secondEntity);
        secondEntity.collide(firstEntity);
    }
}