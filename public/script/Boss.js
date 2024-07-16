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
 
        // this.timeSpawnDevils = 100;     //частота спавна демонов   //сделать спавн тремя волнами в зависимости от хп босса wawe1, wwavw2. wawe 3 boolean
        // this.currentTimeSpawnDevils = 100;

        // let devilZoneWidth = 100;        //зона передвижения для демонов
        // let devilZoneHeight = 0;

        // let wave1 = false;        //флаги для трёх волн спавна демонов
        // let wave2 = false;
        // let wave3 = false;

        // const devilSpawnPlace = {       // точки спавна демонов
        //     1: {
        //         x:1200,
        //         y:500,
        //         // engaged: false,
        //     },
        //     2: {
        //         x:1600,
        //         y:500,
        //         // engaged: false,
        //     },
        //     3: {
        //         x:800,
        //         y:500,
        //         // engaged: false,
        //     },
        // };

        this.maxHp = 100;
        this.hp = 100;

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

        // this.spawnDevils = function ()
        // {
        //     let q = Math.floor(Math.random() * 10 / 4 + 1);  // принимает рандомные значения с 1 по 3
            
        //     for(let c = 0; c < q; c++)
        //     {
        //         let spawned = false;
        //         while (spawned === false)
        //         {
        //             let placeNum = Math.floor(Math.random() * 10 / 4 + 1); // принимает рандомные значения с 1 по 3
        //             if (devilSpawnPlace[placeNum].engaged === false)
        //             {
        //                 const devil = new Devil(devilSpawnPlace[placeNum].x, devilSpawnPlace[placeNum].y, devilZoneWidth, devilZoneHeight, 500, 50, 130);
        //                 devil.view();
        //                 enemies.push(devil);
        //                 devilSpawnPlace[placeNum].engaged = true;
        //                 spawned = true;
        //             }
        //         }
        //     }
        // }

        // this.spawnDevils = function ()
        // {
        //     // let q = Math.floor(Math.random() * 10 / 4 + 1);  // принимает рандомные значения с 1 по 3
        //     for(let placeNum = 1; placeNum < 4; c++)
        //     {
        //         const devil = new Devil(devilSpawnPlace[placeNum].x, devilSpawnPlace[placeNum].y, devilZoneWidth, devilZoneHeight, 500, 50, 130);
        //         devil.view();
        //         enemies.push(devil);
        //     }
        // }

        // this.spawnDevils = function ()
        // {
        //     if (this.currentTimeSpawnDevils <= 0)
        //     {
        //         let spawned = false;
        //         while (spawned === false)
        //         {
        //             let placeNum = Math.floor(Math.random() * 10 / 4 + 1); // принимает рандомные значения с 1 по 3
        //             if (devilSpawnPlace[placeNum].engaged === false)
        //             {
        //                 const devil = new Devil(devilSpawnPlace[placeNum].x, devilSpawnPlace[placeNum].y, devilZoneWidth, devilZoneHeight, 500, 50, 130);
        //                 devil.view();
        //                 enemies.push(devil);
        //                 devilSpawnPlace[placeNum].engaged = true;
        //                 spawned = true;
        //             }
        //         }   
        //     }  
        // }

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
                    this.timeShotAttack = 50;      //частота генерации одиночных выстрелов
                    this.timeUltaAttack = 650;      //частота генерации ульты 
                }
                else if (this.hp <= 0.6 * this.maxHp)
                {
                    this.timeShotAttack = 80;      //частота генерации одиночных выстрелов
                    this.timeUltaAttack = 720;      //частота генерации ульты
                }    
                // this.spawnDevils();        
                // if (this.hp <= 0.98 * this.maxHp && wave1 === false)
                // {
                //     this.spawnDevils();
                //     wave1 === true;
                // } 
                // else if (this.hp <= 0.64 * this.maxHp && wave2 === false)
                // {
                //     this.spawnDevils();
                //     wave2 === true;
                // }
                // else if (this.hp <= 0.31 * this.maxHp && wave3 === false)
                // {
                //     this.spawnDevils();
                //     wave3 === true;
                // }             
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
                if (this.currentTimeShotAttack > 0)
                {
                    this.currentTimeShotAttack -= 1 * time.deltaTime;
                }
                if (this.currentTimeUltaAttack > 0)
                {
                    this.currentTimeUltaAttack -= 1 * time.deltaTime;
                }
                // if (this.currentTimeSpawnDevils > 0)
                // {
                //     this.currentTimeSpawnDevils -= 1 * time.deltaTime;
                // } 
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