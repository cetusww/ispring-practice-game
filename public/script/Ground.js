class Ground {
    constructor(texture, posX, posY, width, height) {
        this.sprite = new PIXI.Sprite(texture)
        this.sprite.x = posX
        this.sprite.y = posY
        this.sprite.width = width
        this.sprite.height = height
        this.sprite.anchor.set(0.5)        

        this.view = function () {
            scene.addChild(this.sprite);
        }

        this.deleteView = function () {
            scene.removeChild(this.sprite);
        }
    }
}