class Stalactite
{
    constructor(posX, posY, damage)
    {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from('stalactite'));
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 17;
        this.sprite.height = 50;
        this.sprite.anchor.set(0.5);
        this.zoneHeight = 100;
        this.speed = 10;
        this.boom = false;
        this.isFall = false;
        this.damage = damage + Math.floor((Math.random() - 0.5) * damage);
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
            if (!this.isFall) 
            {
                if (this.sprite.x <= hero.collideRight && this.sprite.x >= hero.collideLeft &&
                    this.sprite.y + this.zoneHeight <= hero.collideTop
                )
                if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
                    hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y)
                {
                    hero.takeDamage(this.damage);
                }
            }
            // if (this.lifeTime > 0 && !this.boom)
            // {
            //     this.sprite.x += this.sprite.vx * time.deltaTime;
            //     this.sprite.y += this.sprite.vy * time.deltaTime;
            //     this.sprite.vy += GRAVITY_ACCELERATION * time.deltaTime; 
            //     if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
            //         hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y
            //     )
            //     {
            //         this.lifeTime = 10;
            //         this.boom = true;
            //         hero.takeDamage(this.damage);
            //     }
            //     if (!this.boom) {
            //         for (let i = 0; i < platforms.length; i++) {
            //             let platform = platforms[i];
            //             if (this.sprite.y <= platform.collideBottom + this.sprite.vy &&
            //                 this.sprite.y >= platform.collideTop &&
            //                 this.sprite.x <= platform.collideRight &&
            //                 this.sprite.x >= platform.collideLeft
            //             )
            //             {
            //                 this.boom = true;
            //                 this.lifeTime = 10;
            //                 break;
            //             }
            //         }  
            //     }
            // }
            // this.lifeTime -= time.deltaTime;
        }
    }
}