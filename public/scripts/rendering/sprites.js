export const SPRITES = {
    cruiser: loadSprite('/Images/Sprites/battlecruiser.png'),
}

function loadSprite(src) {
    const img = new Image();
    img.src = src;
    return img;
}

export const ENTITY_VISUALS = {
    cruiser: {width: 81, height: 118}
}