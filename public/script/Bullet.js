class Bullet
{
    constructor(texture, posX, posY, vecX, vecY, angle)
    {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from(texture));
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 12;
        this.sprite.height = 17;
        this.sprite.anchor.set(0.5);
        this.speed = 10;
        this.sprite.vx = vecX * this.speed;
        this.sprite.vy = vecY * this.speed;
        this.sprite.rotation += 1.57;
        this.sprite.rotation += angle;
        this.lifeTime = 50;

        this.view = function ()
        {
            scene.addChild(this.sprite);
        }

        this.deleteView = function ()
        {
            scene.removeChild(this.sprite);
        }

        this.update = function (time)
        {
            if (this.lifeTime > 0)
            {
                this.sprite.x += this.sprite.vx * time.deltaTime;
                this.sprite.y += this.sprite.vy * time.deltaTime;
                this.lifeTime -= time.deltaTime;
            }
        }
    }
}