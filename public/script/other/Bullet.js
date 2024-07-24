class Bullet {
    constructor(posX, posY, vecX, vecY, angle) {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from('bullet'));
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 12;
        this.sprite.height = 17;
        this.angle = angle
        this.sprite.anchor.set(0.5);
        this.speed = 10;
        this.sprite.vx = vecX * this.speed;
        this.sprite.vy = vecY * this.speed;
        this.sprite.rotation += 1.57;
        this.sprite.rotation += this.angle;
        this.lifeTime = 0.6 * FPS;
        this.id = (new Date().getTime) * Math.random();
        this.boom = false;
    }

    view() {
        scene.addChild(this.sprite);
    }

    deleteView() {
        scene.removeChild(this.sprite);
    }
    updateCollideHero(time) {
        if (this.lifeTime > 0 && !this.boom) {
            if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
                hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y
            ) {
                this.lifeTime = 0;
                this.boom = true;
                hero.takeDamage(10);
            }
        }
        this.lifeTime -= time.deltaTime;
    }
    updateCollideOpponent(opponent) {
        if (this.lifeTime > 0 && !this.boom) {
            if (opponent.collideLeft <= this.sprite.x && opponent.collideRight >= this.sprite.x &&
                opponent.collideBottom >= this.sprite.y && opponent.collideTop <= this.sprite.y
            ) {
                this.lifeTime = 0;
                this.boom = true;
                opponent.takeDamage(10);
                return 10;
            }
        }
        return 0
    }
    update(time) {
        if (this.lifeTime > 0 && !this.boom) {
            this.sprite.x += this.sprite.vx * time.deltaTime;
            this.sprite.y += this.sprite.vy * time.deltaTime;

            for (let i = 0; i < enemies.length; i++) {
                let enemy = enemies[i];
                if (this.sprite.y <= enemy.collideBottom &&
                    this.sprite.y >= enemy.collideTop &&
                    this.sprite.x <= enemy.collideRight &&
                    this.sprite.x >= enemy.collideLeft
                ) {
                    this.boom = true;
                    this.lifeTime = 2;
                    enemy.takeDamage(20);
                    break;
                }
            }
            if (!this.boom) {
                for (let i = 0; i < platforms.length; i++) {
                    let platform = platforms[i];
                    if (this.sprite.y <= platform.collideBottom + Math.max(this.sprite.vy, 0) &&
                        this.sprite.y >= platform.collideTop + Math.min(this.sprite.vy, 0) &&
                        this.sprite.x <= platform.collideRight &&
                        this.sprite.x >= platform.collideLeft
                    ) {
                        this.boom = true;
                        this.lifeTime = 2;
                        if (this.sprite.vy < 0) {
                            this.sprite.y = platform.collideBottom;
                        }
                        else {
                            this.sprite.y = platform.collideTop;
                        }
                        break;
                    }
                }
            }
            if (!this.boom) {
                for (let i = 0; i < arrayOfWall.length; i++) {
                    let wall = arrayOfWall[i];
                    if (this.sprite.y <= wall.collideBottom + Math.max(this.sprite.vy, 0) &&
                        this.sprite.y >= wall.collideTop + Math.min(this.sprite.vy, 0) &&
                        this.sprite.x <= wall.collideRight &&
                        this.sprite.x >= wall.collideLeft
                    ) {
                        this.boom = true;
                        this.lifeTime = 2;
                        break;
                    }
                }
            }
        }
        this.lifeTime -= time.deltaTime;
    }
}