import {SpriteComponent} from "../components/SpriteComponent";

export class LevelParser {
    static async loadLevel(levelData, world, factory) {
        //
        // const backgroundComponent = new SpriteComponent({
        //     texture: texture.baseTexture,
        //     width,
        //     height,
        //     x,
        //     y
        // });
        // const entity = world.createEntity();
        // entity.addComponent(backgroundComponent);
        // backgroundComponent.view();

        for (let entityDef of levelData.entities) {
            let entity = factory.createEntity(entityDef.type, entityDef)
            world.addEntity(entity)
        }
    }
}