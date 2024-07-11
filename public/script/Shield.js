class Shield
{
    constructor(posX, posY, duration)
    {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from('shield'));
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.duration = duration;
        this.sprite.width = 60;
        this.sprite.height = 60;
        this.speed = 0.03;
        this.sprite.vx = Math.cos(this.speed);
        this.sprite.vy = Math.sin(this.speed);
        this.sprite.anchor.set(0.5);
        this.isTaken = false;
        this.isShieldActive = false;
        this.moveRadius = 3;
        this.moveLeft = posX - this.moveRadius;
        this.moveRight = posX + this.moveRadius;
        this.moveTop = posY - this.moveRadius;
        this.moveBottom = posY + this.moveRadius;

        this.view = function()
        {
            scene.addChild(this.sprite);
            console.log('Bonus view')
        }

        this.deleteView = function()
        {
            scene.removeChild(this.sprite);
        }

        this.update = function(time)
        {
            if (!this.isTaken && !this.isShieldActive)
            {
                if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
                    hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y)
                {
                    this.activateShield = function(duration)
                    {
                        this.isTaken = true;
                        this.deleteView();
                        this.isShieldActive = true;
                        setTimeout(() =>
                        {
                            this.isShieldActive = false;
                            this.deleteView();
                        }, duration * 1000);
                    }
                }
                this.sprite.x += this.sprite.vx * time.deltaTime;
                this.sprite.y += this.sprite.vy * time.deltaTime;
                if (this.sprite.x < this.moveLeft || this.sprite.x > this.moveRight)
                {
                    this.sprite.x -= this.sprite.vx;
                    this.sprite.vx *= -1;
                }
                if (this.sprite.y < this.moveTop || this.sprite.y > this.moveBottom)
                {
                    this.sprite.y -= this.sprite.vy;
                    this.sprite.vy *= -1;
                }
            }
            else if (this.isShieldActive)
            {
                scene.addChild(this.sprite);
            }
        }
    }
}