import {Component} from '/src/ecs/ECS.js';

export class SpriteComponent extends Component {
    constructor(data) {
        super(data);
        // this.sprite = new PIXI.AnimatedSprite(mushroom_idle);
        this.animationSpeed = data.animationSpeed;      // Скорость анимации
        this.loop = data.loop;                // Зацикливание анимации
        // this.sprite.play();                     // Запуск анимации
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        // this.sprite.anchor.set(0.5);
        // this.collideTop = this.sprite.y - this.sprite.height / 2;
        // this.collideBottom = this.sprite.y + this.sprite.height / 2;
        // this.collideLeft = this.sprite.x - this.sprite.width / 2;
        // this.collideRight = this.sprite.x + this.sprite.width / 2;
        this.visibilityZoneWidth = data.visibilityZoneWidth;
        this.attackZoneWidth = data.attackZoneWidth;
        this.timeAttack = data.timeAttack;
        this.currentTimeAttack = data.currentTimeAttack;
        this.maxHp = data.maxHp;
        this.hp = data.hp;
        this.experience = data.experience;
        this.animateType = data.animateType;  // left_idle, left_active, right_idle, right_active
        // this.deadTime = 1 * FPS;
    }
}
