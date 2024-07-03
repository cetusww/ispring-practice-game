class Experience
{
    constructor(posX, posY, experience)
    {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from('experience'));
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 15;
        this.sprite.height = 15;
        this.sprite.anchor.set(0.5);
        this.isTaken = false;
        this.experience = experience;

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
            if (!this.isTaken)
            {
                if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
                    hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y
                )
                {
                    this.isTaken = true;
                    this.deleteView();
                    hero.addExperience(this.experience);
                }
            }
        }
    }
}