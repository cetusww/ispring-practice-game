class Shot
{
    constructor(texture, posX, posY, vecX, vecY, shotSpeed)
    {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from(texture));
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 40;
        this.sprite.height = 40;
        this.sprite.anchor.set(0.5);
        this.speed = shotSpeed;
        this.sprite.vx = vecX * this.speed;
        this.sprite.vy = vecY * this.speed;
        this.lifeTime = 100;
        
        this.boom = false;

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
            if (this.lifeTime > 0 && !this.boom)
            {
                this.sprite.x += this.sprite.vx * time.deltaTime;
                this.sprite.y += this.sprite.vy * time.deltaTime; 
                for (let i = 0; i < platforms.length; i++) {
                    let platform = platforms[i];
                    if (this.sprite.y <= platform.collideBottom + this.sprite.vy &&
                        this.sprite.y >= platform.collideTop + this.sprite.vy &&
                        this.sprite.x <= platform.collideRight &&
                        this.sprite.x >= platform.collideLeft
                    )
                    {
                        this.boom = true;
                        this.lifeTime = 10;
                        break;
                    }
                }
                if (!this.boom) {
                    if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
                        hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y
                    )
                    {
                        this.lifeTime = 10;
                        this.boom = true;
                        // hero.takeDamage(15);
                        hero.takeDamage(0);
                    }  
                }
            }
            this.lifeTime -= time.deltaTime;
        }
    }
}