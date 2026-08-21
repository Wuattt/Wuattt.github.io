import { entitiesAdd, entitiesDelete, entitiesGet } from './gamestate_variables.js'

export const applyServerState = (state) => {
    for (const entity of state) {
            entitiesAdd(entity);
        }
}