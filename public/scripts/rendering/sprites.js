export const SPRITES = {
    cruiser: loadSprite('/Images/Sprites/battlecruiser.png'),
    laser: loadSprite('/Images/Sprites/laser-sprites/33.png'),
}
export const ENTITY_VISUALS = {
    cruiser: {width: 81, height: 118},
    laser: {width: 80, height: 80}
}

function loadSprite(src) {
    const img = new Image();
    img.src = src;
    return img;
}
