import {System} from '/src/ecs/ECS.js';
import {SpriteComponent} from '/src/components/SpriteComponent.js';
import * as PIXI from 'pixijs';

export class SpriteSystem extends System {
    constructor(stage) {
        super();
        this.stage = stage;
        this.requiredComponents = [SpriteComponent];
    }

    update(deltaTime) {
        for (const entity of this.entities) {
            const backgroundComponent = entity.getComponent(SpriteComponent);
            if (backgroundComponent) {
                if (backgroundComponent.sprite) {
                    backgroundComponent.sprite.x = backgroundComponent.x;
                    backgroundComponent.sprite.y = backgroundComponent.y;
                    backgroundComponent.sprite.width = backgroundComponent.width;
                    backgroundComponent.sprite.height = backgroundComponent.height;
                }
            }
        }
    }

    onEntityEnterCache(entity) {
        const backgroundComponent = entity.getComponent(SpriteComponent);

        if (!backgroundComponent.sprite) {
            const texture = backgroundComponent.texture;
            const sprite = new PIXI.Sprite(texture);
            sprite.width = backgroundComponent.width;
            sprite.height = backgroundComponent.height;
            sprite.x = backgroundComponent.x;
            sprite.y = backgroundComponent.y;
            backgroundComponent.sprite = sprite;
            this.stage.addChild(sprite);
        }
    }

    onEntityLeaveCache(entity) {
        const backgroundComponent = entity.getComponent(SpriteComponent);

        if (backgroundComponent.sprite) {
            this.stage.removeChild(backgroundComponent.sprite);
            backgroundComponent.sprite = null;
        }
    }
}
