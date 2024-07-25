class Experience {
    constructor(posX, posY, experience) {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from('experience'));
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 15;
        this.sprite.height = 15;
        this.speed = 0.3;
        this.angle = Math.random() * 3.1415 * 2
        this.sprite.vx = Math.cos(this.angle) * this.speed;
        this.sprite.vy = Math.sin(this.angle) * this.speed;
        this.sprite.anchor.set(0.5);
        this.isTaken = false;
        this.experience = experience;
        this.currentMoveTime = this.moveTime;
        this.moveRadius = 3;
        this.moveLeft = posX - this.moveRadius;
        this.moveRight = posX + this.moveRadius;
        this.moveTop = posY - this.moveRadius;
        this.moveBottom = posY + this.moveRadius;
    }

    view() {
        scene.addChild(this.sprite);
    }

    deleteView() {
        scene.removeChild(this.sprite);
    }

    update(time) {
        if (!this.isTaken) {
            if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
                hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y
            ) {
                this.isTaken = true;
                this.deleteView();
                hero.addExperience(this.experience);
            }
            this.sprite.x += this.sprite.vx * time.deltaTime;
            this.sprite.y += this.sprite.vy * time.deltaTime;
            if (this.sprite.x < this.moveLeft || this.sprite.x > this.moveRight) {
                this.sprite.x -= this.sprite.vx;
                this.sprite.vx *= -1;
            }
            if (this.sprite.y < this.moveTop || this.sprite.y > this.moveBottom) {
                this.sprite.y -= this.sprite.vy;
                this.sprite.vy *= -1;
            }
        }
    }
}