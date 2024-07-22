import {World} from '/src/ecs/ECS.js';
import {BackgroundSystem} from '/src/systems/BackgroundSystem.js';
import {Loader} from '/src/core/Loader.js';
/*import {LevelParser} from '/src/core/LevelParser.js';*/
import {StageManager} from '/src/utils/StageManager.js';
import level1Data from '../../levels/level1.json';
import * as PIXI from 'pixijs';

export class GameController {
    static async start() {
        let levelData = level1Data;

        const app = new PIXI.Application({
            background: '#000000',
            width: window.innerWidth,
            height: window.innerHeight
        });
        document.body.appendChild(app.view);

        StageManager.initialize(app);

        const world = new World();
        world.addSystem(new BackgroundSystem());

        try {
            await Loader.loadLevel(levelData, world,);
        } catch (error) {
            console.error('Error loading level:', error);
            return;
        }

        app.ticker.add((delta) => {
            world.update(delta);
        });
    }
}