class Stalactite {
    constructor(posX, posY, zoneHeight, zoneWidth) {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from('stalactite'));
        this.posX = posX;
        this.posY = posY;

        this.maxHeight = 60;
        this.maxWidth = 21;
        this.minHeight = 30;
        this.minWidth = 15;
        this.stepHeight = 1;
        this.stepWidth = (this.maxWidth - this.sprite.width) / (this.maxHeight - this.sprite.height) / this.stepHeight;
        this.beginDanger = 0.5;
        this.damage = 10;
        this.sprite.anchor.set(0.5, 0);
        this.zoneHeight = zoneHeight;
        this.zoneWidth = zoneWidth;
        this.boom = false;
        this.isFall = false;
        this.lifeTime = 0;
        this.dangerTime = 0.1 * FPS;
        this.random = true;
    }

    view() {
        scene.addChild(this.sprite);
        this.init();
    }

    init() {
        this.boom = false;
        this.isFall = false;
        this.sprite.y = this.posY;
        this.sprite.x = this.posX;
        this.danger = this.beginDanger;
        this.timeHeight = (Math.random() + 0.5) * FPS;
        this.currentTimeHeight = this.timeHeight;
        this.sprite.width = this.minWidth;
        this.sprite.height = this.minHeight;
        this.sprite.vy = 0;
        if (this.random)
            {
                this.timeHeight = (Math.random() + 0.5) * FPS;
                this.fallDanger = (Math.random() * 0.7) + 0.5;
                this.damage = (Math.random() * 5) + 5;
            } else
            {
                this.timeHeight = 0.5 * FPS;
                this.fallDanger = 0.8;
                this.damage = 7;
            }
            this.currentTimeHeight = this.timeHeight;
            
    
    }

    deleteView() {
        scene.removeChild(this.sprite);
    }

    updateCollide() {
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideTop = this.sprite.y;
    }

    update(time) {
        if (!this.isFall) {

            if (this.sprite.height < this.maxHeight) {
                if (this.currentTimeHeight < 0) {
                    this.sprite.height += this.stepHeight;
                    this.sprite.width += this.stepWidth;
                    this.currentTimeHeight = this.timeHeight;
                    this.danger += 0.04;
                } else {
                    this.currentTimeHeight -= time.deltaTime;
                }
            }
            if (this.danger >= this.fallDanger) {
                this.isFall = true;
                this.dangerTime = 0.25 * FPS;
            }
        } else if (!this.boom) {
            this.sprite.y += this.sprite.vy * time.deltaTime;
            this.sprite.vy += GRAVITY_ACCELERATION / 8 * time.deltaTime;
            this.updateCollide();
            if (this.dangerTime <= 0) {
                if (this.sprite.x <= hero.collideRight &&
                    this.sprite.x >= hero.collideLeft &&
                    this.collideBottom >= hero.collideTop &&
                    this.collideTop <= hero.collideBottom
                ) {
                    this.boom = true;
                    console.log(this.sprite.vy)
                    hero.takeDamage(this.damage * this.danger + this.sprite.vy);
                    this.lifeTime = 0.5 * FPS;
                }
                for (let i = 0; i < platforms.length; i++) {
                    if (this.boom) { break; }
                    let platform = platforms[i];
                    if (this.collideTop <= platform.collideBottom + Math.max(this.sprite.vy, 0) &&
                        this.collideBottom >= platform.collideTop &&
                        this.sprite.x <= platform.collideRight &&
                        this.sprite.x >= platform.collideLeft
                    ) {
                        this.boom = true;
                        this.lifeTime = 2 * FPS;
                    }
                }
                for (let i = 0; i < woodenPlanks.length; i++) {
                    if (this.boom) { break; }
                    let woodenPlank = woodenPlanks[i];
                    if (this.collideTop <= woodenPlank.collideBottom + Math.max(this.sprite.vy, 0) &&
                        this.collideBottom >= woodenPlank.collideTop &&
                        this.sprite.x <= woodenPlank.collideRight &&
                        this.sprite.x >= woodenPlank.collideLeft
                    ) {
                        this.boom = true;
                        this.lifeTime = 2 * FPS;
                    }
                }
                for (let i = 0; i < arrayOfWall.length; i++) {
                    if (this.boom) { break; }
                    let wall = arrayOfWall[i];
                    if (this.collideTop <= wall.collideBottom + Math.max(this.sprite.vy, 0) &&
                        this.collideBottom >= wall.collideTop &&
                        this.sprite.x <= wall.collideRight &&
                        this.sprite.x >= wall.collideLeft
                    ) {
                        this.boom = true;
                        this.lifeTime = 2 * FPS;
                    }
                }
            } else {
                this.dangerTime -= time.deltaTime;
            }
        } else {
            if (this.lifeTime < 0) {
                this.init();
            } else {
                this.lifeTime -= time.deltaTime;
            }
        }
    }
}