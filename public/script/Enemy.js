class Enemy
{
    constructor(posX, posY, zoneWidth, zoneHeight, visibilityZoneWidth, visibilityZoneHeight)
    {
        this.sprite = new PIXI.AnimatedSprite(greenCapEnemyWalk);
        this.sprite.animationSpeed = 0.05; // Скорость анимации
        this.sprite.loop = true; // Зацикливание анимации
        this.sprite.play(); // Запуск анимации

        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 50;
        this.sprite.height = 56;

        this.collideTop = this.sprite.y - this.sprite.height / 2;
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideLeft = this.sprite.x - this.sprite.width / 2;
        this.collideRight = this.sprite.x + this.sprite.width / 2;

        this.sprite.anchor.set(0.5);
        this.speedX = 2;
        this.speedY = 0;
        this.sprite.vx = this.speedX;
        this.sprite.vy = 0;

        this.jumpPower = 12;
        this.gravitationPower = 0.5;

        this.zoneWidth = zoneWidth;
        this.zoneHeight = zoneHeight;
        this.zoneX = posX;
        this.zoneY = posY;
        this.visibilityZoneWidth = visibilityZoneWidth;
        this.visibilityZoneHeight = visibilityZoneHeight;

        this.ainimateType = '';
        this.timeAttack = 50;
        this.currentTimeAttack = 0;

        this.angle = 3.1415 * 30 / 180;
        this.updateAnim = function (type)
        {
            if (type === 'idle')
            {
                this.sprite.loop = false;
                this.sprite.textures = hero_idle;
                this.sprite.animationSpeed = 0.15;
                this.sprite.loop = true;
                this.sprite.play();
                this.ainimateType = 'idle';
            } else if (type === 'walk')
            {
                this.sprite.textures = hero_walk;
                this.sprite.animationSpeed = 0.3;
                this.sprite.loop = true;
                this.sprite.play();
                this.ainimateType = 'walk';
            } else if (type === 'jump')
            {
                this.sprite.textures = hero_jump;
                this.sprite.animationSpeed = 0.3;
                this.sprite.loop = false;
                this.sprite.play();
                this.ainimateType = 'jump';
            }  
        }

        this.updateCollide = function ()
        {
            this.collideTop = this.sprite.y - this.sprite.height / 2;
            this.collideBottom = this.sprite.y + this.sprite.height / 2;
            this.collideLeft = this.sprite.x - this.sprite.width / 2;
            this.collideRight = this.sprite.x + this.sprite.width / 2;
        }

        this.view = function ()
        {
            scene.addChild(this.sprite);
        }

        this.deleteView = function ()
        {
            scene.removeChild(this.sprite);
        }
        this.createFireball = function (heroX, heroY)
        {
            if (this.currentTimeAttack <= 0)
            {
                let distanceX = heroX - this.sprite.x;
                let tanAngle = Math.tan(this.angle);
                let vecX = Math.sqrt(Math.abs(distanceX / 100) * GRAVITY_ACCELERATION / 2 / tanAngle);
                let vecY = vecX * tanAngle;
                if (distanceX < 0)
                {
                    vecX *= -1;
                }
                const fireball = new Fireball('fireball', this.sprite.x, this.sprite.y, vecX, -vecY, 0);
                fireball.view();
                fireballs.push(fireball); 
                this.currentTimeAttack = this.timeAttack;
            }  
        }

        this.updateMove = function(time) 
        {
            this.sprite.x += this.sprite.vx * time.deltaTime;
            this.updateCollide();
            if (this.collideLeft <= this.zoneX - this.zoneWidth)
            {
                this.sprite.vx *= -1;
                this.sprite.x += (this.zoneX - this.zoneWidth) - this.collideLeft;
            }
            else if (this.collideRight >= this.zoneX + this.zoneWidth)
            {
                this.sprite.vx *= -1;
                this.sprite.x -= this.collideRight - (this.zoneX + this.zoneWidth);
            }
            if ((this.sprite.scale.x < 0 && this.sprite.vx > 0) || (this.sprite.scale.x > 0 && this.sprite.vx < 0))
            {
                this.sprite.scale.x *= -1;
            }
        }
        this.updateAggression = function ()
        {
            if (!hero.dead)
            {
                if (hero.collideRight >= this.zoneX - this.zoneWidth - this.visibilityZoneWidth && 
                    hero.collideLeft <= this.zoneX + this.zoneWidth + this.visibilityZoneWidth &&
                    hero.collideBottom <= this.collideBottom + 10 && hero.collideBottom >= this.collideBottom - this.zoneHeight - this.visibilityZoneHeight
                )
                {
                    this.createFireball(hero.sprite.x, hero.sprite.y);
                }
            }
        }
        this.update = function (time)
        {
            if (this.currentTimeAttack > 0)
            {
                this.currentTimeAttack -= 1 * time.deltaTime;
            }
            this.updateMove(time);
            this.updateAggression();
        }
    }
}