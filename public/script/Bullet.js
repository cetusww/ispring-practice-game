class Bullet {
    constructor(texture, posX, posY, speedX, speedY) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = posX
        this.sprite.y = posY
        this.sprite.width = 60
        this.sprite.height = 85
        this.sprite.anchor.set(0.5)
        this.sprite.vx = speedX
        this.sprite.vy = speedY
        this.lifeTime = 5

        this.view = function () {
            scene.addChild(this.sprite);
        }

        this.deleteView = function () {
            scene.removeChild(this.sprite);
        }

        this.update = function (time) {
            if (this.lifeTime > 0) {
                this.sprite.x += this.sprite.vx * time.deltaTime
                this.liveTime -= time.deltaTime
            } else
            {
                this.deleteView()
            }
        }
    }
}