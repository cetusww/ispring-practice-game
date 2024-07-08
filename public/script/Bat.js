class Bat
{
    constructor(posX, posY, zoneWidth, zoneHeight, visibilityZoneWidth, visibilityZoneHeight)
    {
        this.sprite = new PIXI.AnimatedSprite(batFlyHorizontal);
        this.sprite.animationSpeed = 0.1; // Скорость анимации
        this.sprite.loop = true; // Зацикливание анимации
        this.sprite.play(); // Запуск анимации

        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 32;
        this.sprite.height = 32;

        this.collideTop = this.sprite.y - this.sprite.height / 2;
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideLeft = this.sprite.x - this.sprite.width / 2;
        this.collideRight = this.sprite.x + this.sprite.width / 2;

        this.sprite.anchor.set(0.5, 0.5);
        this.speedX = 2,5;
        this.speedY = 2,5;
        this.sprite.vx = this.speedX;
        this.sprite.vy = 0;

        this.zoneWidth = zoneWidth;
        this.zoneHeight = zoneHeight;
        this.zoneX = posX;
        this.zoneY = posY;
        this.visibilityZoneWidth = visibilityZoneWidth;
        this.visibilityZoneHeight = visibilityZoneHeight;

        this.timeAttack = 100;
        this.currentTimeAttack = 0;
        this.maxHp = 300;
        this.hp = 300;
        this.experience = 100;

        this.animateType = '';
        this.deadTime = 1 * FPS;

        this.updateAnim = function (type)
        {
            if (type === 'horizontal' && this.animateType !== 'horizontal')
            {
                this.sprite.loop = false;
                this.sprite.textures = batFlyHorizontal;
                this.sprite.animationSpeed = 0.1;
                this.sprite.loop = true;
                this.sprite.play();
                this.animateType = 'horizontal';
            } else if (type === 'vertical' && this.animateType !== 'vertical')
            {
                this.sprite.textures = batFlyVertical;
                this.sprite.animationSpeed = 0.1;
                this.sprite.loop = true;
                this.sprite.play();
                this.animateType = 'vertical';
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
            this.updateHp();
        }

        this.deleteView = function ()
        {
            scene.removeChild(this.sprite);
            scene.removeChild(this.graphics);
        }

        this.createPoison = function (heroX, heroY)
        {
            let poisonSpeed = 3;
            if (this.currentTimeAttack <= 0)
            {
                let distanceX = heroX - this.sprite.x;
                let distanceY = heroY - this.sprite.y;
                let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                let angleCos = distanceX / distance;
                let angleSin = distanceY / distance;
                let vecX = Math.abs(poisonSpeed * angleCos);
                let vecY = Math.abs(poisonSpeed * angleSin);
                if (heroX > this.sprite.x && heroY < this.sprite.y)
                {
                    vecY *= -1;
                }
                if (heroX < this.sprite.x && heroY > this.sprite.y)
                {
                    vecX *= -1;
                }
                if (heroX < this.sprite.x && heroY < this.sprite.y)
                {
                    vecX *= -1;
                    vecY *= -1;
                }
                const poison = new Poison('poison', this.sprite.x, this.sprite.y, vecX, vecY, poisonSpeed);
                poison.view();
                poisons.push(poison); 
                this.currentTimeAttack = this.timeAttack;
            }  
        }

        this.updateHp = function () {
            scene.removeChild(this.graphics);
            this.graphics = new PIXI.Graphics();
            this.graphics.rect(this.sprite.x - this.sprite.width / 2 + 5, this.sprite.y - this.sprite.height / 2 - 7, this.hp / this.maxHp * (this.sprite.width - 10), 5);
            this.graphics.fill(0xde3249);
            this.graphics.rect(this.sprite.x - this.sprite.width / 2 + 5, this.sprite.y - this.sprite.height / 2 - 7, this.sprite.width - 10, 5);
            this.graphics.stroke({ width: 1, color: 0xfeeb77 });
            scene.addChild(this.graphics);
        }

        this.takeDamage = function (damage)
        {
            this.hp -= damage;
            if (this.hp <= 0) 
            {
                this.hp = 0;
                this.dead = true;
            }
            this.updateHp();
        }

        this.updateMove = function(time) 
        {
            this.sprite.x += this.sprite.vx * time.deltaTime;
            this.sprite.y += this.sprite.vy * time.deltaTime;
            this.updateCollide();
            if (this.sprite.vx != 0)
            {
                if (this.collideRight >= this.zoneX + this.zoneWidth)
                {
                    this.sprite.vx *= 0;
                    this.sprite.vy = this.speedY;
                    this.updateAnim('vertical');
                }
                else if (this.collideLeft <= this.zoneX - this.zoneWidth)
                {
                    this.sprite.vx *= 0;
                    this.sprite.vy = this.speedY * (-1);
                    this.updateAnim('vertical');
                }
            }
            else
            {
                if (this.collideBottom >= this.zoneY + this.zoneHeight)
                {
                    this.sprite.vx = this.speedX * (-1);
                    this.sprite.vy *= 0;
                    this.updateAnim('horizontal');
                }
                else if (this.collideTop <= this.zoneY - this.zoneHeight)
                {
                    this.sprite.vx = this.speedX;
                    this.sprite.vy *= 0;
                    this.updateAnim('horizontal');
                }
            }            
            if (this.sprite.vx < 0 && this.sprite.vy == 0)
            {
                this.sprite.scale.x = -1;
            }
            else
            {
                this.sprite.scale.x = 1;
            }
            
        }

        this.updateAggression = function ()
        {
            if (!hero.dead)
            {
                if (hero.collideRight >= this.sprite.x - this.visibilityZoneWidth && 
                    hero.collideLeft <= this.sprite.x + this.visibilityZoneWidth &&
                    hero.collideBottom >= this.sprite.y - this.visibilityZoneHeight &&
                    hero.collideTop <= this.sprite.y + this.visibilityZoneHeight)
                {
                    this.createPoison(hero.sprite.x, hero.sprite.y);
                }
            }
        }

        this.dropExperience = function ()
        {    
            let randomCount = Math.floor(Math.random() * 5) + 2;
            let experienceCount = Math.floor(this.experience / randomCount);
            console.log('+', randomCount);
            let i = -Math.floor(randomCount / 2)
            for (i; i < randomCount -Math.floor(randomCount / 2) - 1; i++)
            {
                let experience = new Experience(this.sprite.x + i * 20, this.collideBottom - 5, experienceCount);
                experience.view();
                experiences.push(experience);
            }
            let experience = new Experience(this.sprite.x + i * 20, this.collideBottom - 5, this.experience - experienceCount * (randomCount - 1))
            experience.view();
            experiences.push(experience);
        }
        
        this.update = function (time)
        {
            if (!this.dead)
            {
                if (this.currentTimeAttack > 0)
                {
                    this.currentTimeAttack -= 1 * time.deltaTime;
                }
                this.updateHp();
                this.updateMove(time);
                this.updateAggression();
                this.updateCollide();
            }
            else 
            {
                this.deadTime -= time.deltaTime;
            }
        }
    }
}