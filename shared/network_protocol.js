export const ENTITY_TYPE = {
    CRUISER: 0,
    CRUISER_PART: 1,
    LASER: 2,
    ASTEROID: 3,
    ROCKET: 4
}

export const BYTES_PER_ENTITY =
4 + // id (Uint32)
1 + // type (Uint8)
4 + // x (Float32)
4 + // y (Float32)
2 + // deg (Int16)
1; // hp (Uint8)
// total 16 bytes per entity