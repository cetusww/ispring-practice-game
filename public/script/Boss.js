class Boss
{
    constructor(posX, posY, zoneWidth)
    {
        this.sprite = new PIXI.AnimatedSprite(boss_idle);
        this.sprite.animationSpeed = 0.1; // Скорость анимации
        this.sprite.loop = true;          // Зацикливание анимации
        this.sprite.play();               // Запуск анимации

        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 96;
        this.sprite.height = 160;

        this.collideTop = this.sprite.y - this.sprite.height / 2;
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideLeft = this.sprite.x - this.sprite.width / 2;
        this.collideRight = this.sprite.x + this.sprite.width / 2;

        this.sprite.anchor.set(0.5);
        this.sprite.vx = 2.5;

        this.zoneWidth = zoneWidth;

        this.zoneX = posX;
        this.zoneY = posY;

        this.shotSpeed = 7;

        this.timeShotAttack = 100;      //частота генерации одиночных выстрелов
        this.currentTimeShotAttack = 0;

        this.timeUltaAttack = 800;      //частота генерации ульты (веера из выстрелов)
        this.currentTimeUltaAttack = 800;
 
        this.timeSpawnDevils = 3000;     //частота спавна демонов   //сделать спавн тремя волнами в зависимости от хп босса wawe1, wwavw2. wawe 3 boolean
        this.currentTimeSpawnDevils = 100;

        this.devilZoneWidth = 200;        //зона передвижения для демонов
        this.devilZoneHeight = 0;

        this.devilSpawnPlace = {       // точки спавна демонов
            1: {
                x:1200,
                y:830,
                engaged: false,
            },
            2: {
                x:1800,
                y:830,
                engaged: false,
            },
            3: {
                x:2470,
                y:1215,
                engaged: false,
            },
        };

        this.maxHp = 1000;
        this.hp = 1000;
        this.experience = 50; //всего из босса выпадает 1000 опыта

        this.animateType = 'idle';
        this.deadTime = 3 * FPS;

        this.state = 0; // 0 - стоять, 1 - ходить
        this.stateTime = Math.random() * FPS;
        
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

        this.updateHp = function () {
            scene.removeChild(this.graphics);
            this.graphics = new PIXI.Graphics();
            this.graphics.rect(this.sprite.x - this.sprite.width / 2 + 5, this.sprite.y - this.sprite.height / 2 - 7, this.hp / this.maxHp * (this.sprite.width - 10), 5);
            this.graphics.fill(0xde3249);
            this.graphics.rect(this.sprite.x - this.sprite.width / 2 + 5, this.sprite.y - this.sprite.height / 2 - 7, this.sprite.width - 10, 5);
            this.graphics.stroke({ width: 1, color: 0xfeeb77 });
            scene.addChild(this.graphics);
        }

        this.updateAnim = function (type) {
            if (type === 'boss_idle' && this.animateType !== 'boss_idle') {
                this.sprite.loop = false;
                this.sprite.textures = boss_idle;
                this.sprite.animationSpeed = 0.05;
                this.sprite.loop = true;
                this.sprite.play();
                this.animateType = 'boss_idle';
            } else if (type === 'boss_walk' && this.animateType !== 'boss_walk') {
                this.sprite.textures = boss_walk;
                this.sprite.animationSpeed = 0.25;
                this.sprite.loop = true;
                this.sprite.play();
                this.animateType = 'boss_walk';
            } else if (type === 'boss_dead' && this.animateType !== 'boss_dead') {
                this.sprite.textures = boss_dead;
                this.sprite.animationSpeed = 0.05;
                this.sprite.loop = false;
                this.sprite.play();
                this.animateType = 'boss_dead';
            }
        }

        this.updateCollide = function ()
        {
            this.collideTop = this.sprite.y - this.sprite.height / 2;
            this.collideBottom = this.sprite.y + this.sprite.height / 2;
            this.collideLeft = this.sprite.x - this.sprite.width / 2;
            this.collideRight = this.sprite.x + this.sprite.width / 2;
        }

        this.createShot = function (heroX, heroY)
        {
            if (this.currentTimeShotAttack <= 0)
            {
                let shotSpeed = this.shotSpeed
                let distanceX = heroX - this.sprite.x;
                let distanceY = heroY - this.sprite.y;
                let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                let angleCos = distanceX / distance;
                let angleSin = distanceY / distance;
                let vecX = Math.abs(shotSpeed * angleCos);
                let vecY = Math.abs(shotSpeed * angleSin);
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
                const shot = new Shot('shot', this.sprite.x, this.sprite.y, vecX, vecY, 1);
                shot.view();
                shots.push(shot);

                let audio = new Audio('/sounds/vyistrel.ogg');
                audio.volume = 0.2;
                audio.load();
                audio.play();

                this.currentTimeShotAttack = this.timeShotAttack;
            }  
        }

        this.createUlta = function ()
        {
            if (this.currentTimeUltaAttack <= 0) 
            {
                let shotSpeed = this.shotSpeed
                let deg;

                for(deg = 0; deg <= 180; deg += 10)   //генерация веера из фаерболлов в полуокружности с шагом в 20 градусов
                {
                    let angleCos = Math.cos(deg * Math.PI / 180);
                    let angleSin = - Math.sin(deg * Math.PI / 180);
                    let vecX = shotSpeed * angleCos;
                    let vecY = shotSpeed * angleSin;

                    const shot = new Shot('shot', this.sprite.x, this.sprite.y, vecX, vecY, 1);
                    shot.view();
                    shots.push(shot);
                }

                let audio = new Audio('/sounds/vyistrel.ogg');
                audio.volume = 0.2;
                audio.load();
                audio.play();

                this.currentTimeUltaAttack = this.timeUltaAttack;
            }  
        }

        this.spawnDevils = function ()
        {
            if (this.currentTimeSpawnDevils <= 0) 
            {
                let q = Math.floor(Math.random() * 10 / 4 + 1);  // принимает рандомные значения с 1 по 3
                
                for(let c = 0; c < q; c++)
                {
                    let spawned = false;
                    while (spawned === false)
                    {
                        let placeNum = Math.floor(Math.random() * 10 / 4 + 1); // принимает рандомные значения с 1 по 3
                        if (this.devilSpawnPlace[placeNum].engaged === false)
                        {
                            const devil = new Devil(this.devilSpawnPlace[placeNum].x, this.devilSpawnPlace[placeNum].y, this.devilZoneWidth, this.devilZoneHeight, 500, 50, 130);
                            devil.view();
                            enemies.push(devil);
                            this.devilSpawnPlace[placeNum].engaged = true;
                            spawned = true;
                        }
                    }
                }
                for(let placeNum = 1; placeNum < 4; placeNum++)
                {
                    this.devilSpawnPlace[placeNum].engaged = false;
                }
                this.currentTimeSpawnDevils = this.timeSpawnDevils
            }
        }

        this.takeDamage = function (damage)
        {
            this.hp -= damage;
            if (this.hp <= 0) 
            {
                this.hp = 0;

                this.updateAnim('boss_dead');

                this.dead = true;
            }
            this.updateHp();
        }

        this.updateMove = function(time) 
        { 
            if (this.stateTime > 0)
            {
                this.stateTime -= time.deltaTime;
            }
            else
            {
                if (Math.random() > 0.4) 
                {
                    this.state = 1;
                    this.stateTime = (Math.random() + 1) * 2 * FPS;
                    this.updateAnim('boss_walk');
                } 
                else
                {
                    this.state = 0;
                    this.stateTime = (Math.random() + 0.5) * FPS;
                    this.updateAnim('boss_idle');
                }
            }
            if (this.state === 1)
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
                this.createUlta();
                if (this.currentTimeUltaAttack <= 700) 
                {
                    this.createShot(hero.sprite.x, hero.sprite.y);
                }
                if (this.hp <= 0.3 * this.maxHp)
                {
                    this.timeShotAttack = 60;      //частота генерации одиночных выстрелов
                    this.timeUltaAttack = 660;      //частота генерации ульты 
                }
                else if (this.hp <= 0.6 * this.maxHp)
                {
                    this.timeShotAttack = 80;      //частота генерации одиночных выстрелов
                    this.timeUltaAttack = 720;      //частота генерации ульты
                } 
                if (enemies.length < 2) 
                {
                    this.spawnDevils(); 
                }          
            }
        }

        this.dropExperience = function ()
        {    
            for (let i = 1; i < 21; i++)
            {
                let experience = new Experience(this.sprite.x + i * 20, this.collideBottom - 5, this.experience);
                experience.view();
                experiences.push(experience);
            }
        }
        
        this.update = function (time)
        {
            if (!this.dead)
            {
                if (this.currentTimeShotAttack > 0)
                {
                    this.currentTimeShotAttack -= 1 * time.deltaTime;
                }
                if (this.currentTimeUltaAttack > 0)
                {
                    this.currentTimeUltaAttack -= 1 * time.deltaTime;
                }
                if (this.currentTimeSpawnDevils > 0)
                {
                    this.currentTimeSpawnDevils -= 1 * time.deltaTime;
                } 
                this.updateHp();
                this.updateCollide();
                this.updateMove(time);
                this.updateAggression();
            }
            else 
            {
                this.deadTime -= time.deltaTime;
            }
        }
    }
}