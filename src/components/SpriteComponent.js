import {Component} from '/src/ecs/ECS.js';

export class SpriteComponent extends Component {
    constructor(data) {
        super(data);
        this.texture = data.texture;
        this.width = data.width;
        this.height = data.height;
        this.x = data.x;
        this.y = data.y;
        this.sprite = null;
    }
}
