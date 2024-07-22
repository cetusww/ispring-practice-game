import {Component} from '/src/ecs/ECS.js';

export class SpriteComponent extends Component {
    constructor(data) {
        super(data);
        // this.sprite = new PIXI.AnimatedSprite(devilIdle);
        this.animationSpeed = data.animationSpeed;  // Скорость анимации
        this.loop = data.loop;            // Зацикливание анимации
        // this.sprite.play();                 // Запуск анимации

        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;

        // this.collideTop = this.sprite.y - this.sprite.height / 2;
        // this.collideBottom = this.sprite.y + this.sprite.height / 2;
        // this.collideLeft = this.sprite.x - this.sprite.width / 2;
        // this.collideRight = this.sprite.x + this.sprite.width / 2;

        // this.sprite.anchor.set(0.5);

        this.speedX = data.speedX;
        this.speedY = data.speedY;
        this.vx = data.vx;
        this.vy = data.vy;

        this.zoneWidth = data.zoneWidth;
        this.zoneHeight = data.zoneHeight;
        this.zoneX = data.zoneX;
        this.zoneY = data.zoneY;
        this.visibilityZoneWidth = data.visibilityZoneWidth;
        this.visibilityZoneHeight = data.visibilityZoneHeight;

        this.timeAttack = data.timeAttack;
        this.currentTimeAttack = data.currentTimeAttack;
        this.maxHp = data.maxHp;
        this.hp = data.hp;
        this.experience = data.experience;

        // this.angle = 3.1415 * 30 / 180;
        // this.deadTime = 1 * FPS;
        this.state = data.state; // 0 - стоять, 1 - ходить
        // this.stateTime = Math.random() * FPS;
        this.animateType = data.animateType;
    }
}
