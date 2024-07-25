class Smoke {
    constructor(posX, posY, vecX, damage) {
        this.sprite = new PIXI.AnimatedSprite(smoke_anim);
        this.sprite.animationSpeed = 0.3;      // Скорость анимации
        this.sprite.loop = false;              // Зацикливание анимации
        this.sprite.play();

        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 80;
        this.sprite.height = 36;
        this.sprite.anchor.set(0.5);
        this.speed = 3;
        this.sprite.vx = vecX * this.speed;
        this.lifeTime = 60;
        this.boom = false;
        this.damage = damage + Math.floor((Math.random() - 0.5) * damage);
    }

    view() {
        scene.addChild(this.sprite);
        if (this.sprite.vx > 0) {
            this.sprite.scale.x *= -1;
        }
        this.sprite.play();
    }

    deleteView() {
        scene.removeChild(this.sprite);
    }

    update(time) {
        if (this.lifeTime > 0 && !this.boom) {
            this.sprite.x += this.sprite.vx * time.deltaTime;
            if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
                hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y
            ) {
                this.lifeTime = 10;
                this.boom = true;
                hero.takeDamage(this.damage);
            }
        }
        this.lifeTime -= time.deltaTime;
    }
}