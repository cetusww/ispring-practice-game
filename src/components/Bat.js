import {Component} from '/src/ecs/ECS.js';

export class Bat extends Component {
    constructor(data) {
        super(data);
        // this.sprite = new PIXI.AnimatedSprite(batFlyHorizontal);
        this.animationSpeed = data.animationSpeed; // Скорость анимации
        this.loop = data.loop;    // Зацикливание анимации
        // this.sprite.play();          // Запуск анимации
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        // this.collideTop = this.sprite.y - this.sprite.height / 2;
        // this.collideBottom = this.sprite.y + this.sprite.height / 2;
        // this.collideLeft = this.sprite.x - this.sprite.width / 2;
        // this.collideRight = this.sprite.x + this.sprite.width / 2;
        // this.sprite.anchor.set(0.5, 0.5);
        this.speedX = data.speedX;
        this.speedY = data.speedY;
        this.vx = data.vx;
        this.vy = data.vy;
        this.zoneWidth = data.zoneWidth;
        this.zoneHeight = data.zoneHeight;
        this.zoneX = posX;
        this.zoneY = posY;
        this.visibilityZoneWidth = data.visibilityZoneWidth;
        this.visibilityZoneHeight = data.visibilityZoneHeight;
        this.timeAttack = data.timeAttack;
        this.currentTimeAttack = data.currentTimeAttack;
        this.maxHp = data.maxHp;
        this.hp = data.hp;
        this.experience = data.experience;
        this.animateType = data.animateType;
        // this.deadTime = 1 * FPS;
    }
}
