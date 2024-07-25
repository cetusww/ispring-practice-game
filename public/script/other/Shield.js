class Shield {
    constructor(posX, posY, duration) {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from('shield'));
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.duration = duration;
        this.sprite.width = 40;
        this.sprite.height = 40;
        this.speed = 0.03;
        this.sprite.vx = Math.cos(this.speed);
        this.sprite.vy = Math.sin(this.speed);
        this.sprite.anchor.set(0.5);
        this.isTaken = false;
        this.isShieldActive = false;
        this.moveRadius = 3;
        this.moveLeft = posX - this.moveRadius;
        this.moveRight = posX + this.moveRadius;
        this.moveTop = posY - this.moveRadius;
        this.moveBottom = posY + this.moveRadius;
        this.scaleTime = 0.4 * FPS;
        this.currentScaleTime = this.scaleTime;
        this.scaleStep = 0.00035;
        this.id = 0;
    }    

    view() {
        scene.addChild(this.sprite);
    }

    deleteView() {
        scene.removeChild(this.sprite);
    }

    update(time) {
        if (!this.isTaken) {
            if (this.currentScaleTime > 0) {
                this.currentScaleTime -= time.deltaTime
                this.sprite.scale.x += this.scaleStep * time.deltaTime;
                this.sprite.scale.y += this.scaleStep * time.deltaTime;
            } else {
                this.currentScaleTime = this.scaleTime;
                this.scaleStep *= -1;
            }
            if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
                hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y) {
                hero.addShield(this.duration);
                this.isTaken = true;
            }
        }
    }
}