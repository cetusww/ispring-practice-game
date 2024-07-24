class Portal {
    constructor(posX, posY) {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from('non_active_portal'));
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 150;
        this.sprite.height = 150;
        this.rotateSpeed = 0.05;
        this.sprite.anchor.set(0.5);
        this.collideLeft = this.sprite.x - this.sprite.width / 4;
        this.collideRight = this.sprite.x + this.sprite.width / 4;
        this.collideTop = this.sprite.y - this.sprite.width / 4;
        this.collideBottom = this.sprite.y + this.sprite.width / 4;
        this.isActive = false;
    }

    view() {
        scene.addChild(this.sprite);
    }

    deleteView() {
        scene.removeChild(this.sprite);
    }

    activate() {
        this.sprite.texture = PIXI.Texture.from('portal');
        this.isActive = true;
    }

    update(time) {
        if (this.isActive) {
            if (hero.collideLeft <= this.collideRight && hero.collideRight >= this.collideLeft &&
                hero.collideBottom >= this.collideTop && hero.collideTop <= this.collideBottom
            ) {
                //window.location.href = "/win";
                hero.isWin = true;
            }
            this.sprite.rotation += this.rotateSpeed * time.deltaTime;
        }
    }
}