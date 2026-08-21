let entities = new Map;
export function entitiesAdd (entity) {
    entities.set(entity.id, entity);
}
export function entitiesDelete (entity) {
    entities.delete(entity.id);
}
export function entitiesGet () {
    return entities.values();
}
export function entitiesFind (id) {
    return entities.get(id);
}

let controlledEntity = null;
export function controlledEntitySet (entity) {controlledEntity = entity;}
export const controlledEntityGet = () => controlledEntity;