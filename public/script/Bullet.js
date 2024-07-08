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
        this.lifeTime = 0.5 * FPS;
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
                

                for (let i = 0; i < enemies.length; i++)
                {
                    let enemy = enemies[i];
                    if (this.sprite.y <= enemy.collideBottom &&
                        this.sprite.y >= enemy.collideTop &&
                        this.sprite.x <= enemy.collideRight &&
                        this.sprite.x >= enemy.collideLeft
                    )
                    {
                        this.boom = true;
                        this.lifeTime = 2;
                        enemy.takeDamage(20);
                        break;
                    }
                }
                if (!this.boom)
                {
                    for (let i = 0; i < platforms.length; i++)
                    {
                        let platform = platforms[i];
                        if (this.sprite.y <= platform.collideBottom + Math.max(this.sprite.vy, 0) &&
                            this.sprite.y >= platform.collideTop + Math.min(this.sprite.vy, 0) &&
                            this.sprite.x <= platform.collideRight &&
                            this.sprite.x >= platform.collideLeft
                        )
                        {
                            this.boom = true;
                            this.lifeTime = 2;
                            if (this.sprite.vy < 0) {
                                this.sprite.y = platform.collideBottom; 
                            }
                            else
                            {
                                this.sprite.y = platform.collideTop; 
                            }
                            break;
                        }
                    }  
                }
            }
            this.lifeTime -= time.deltaTime;
        }
    }
}