class Wall
{
    constructor(texture, posX, posY, width, height)
    {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = width;
        this.sprite.height = height;
        this.sprite.anchor.set(0.5); 
        this.collideTop = this.sprite.y - this.sprite.height / 2;
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideLeft = this.sprite.x - this.sprite.width / 2;
        this.collideRight = this.sprite.x + this.sprite.width / 2;

        this.view = function ()
        {
            scene.addChild(this.sprite);
        }

        this.deleteView = function ()
        {
            scene.removeChild(this.sprite);
        }
    }
}