class Hero
{
    constructor(posX, posY, speedX, speedY, experienceMax)
    {
        this.sprite = new PIXI.AnimatedSprite(hero_idle);

        this.sprite.animationSpeed = 0.2; // Скорость анимации
        this.sprite.loop = true; // Зацикливание анимации
        this.sprite.play(); // Запуск анимации

        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 70;
        this.sprite.height = 85;

        this.collideTop = this.sprite.y - this.sprite.height / 2;
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideLeft = this.sprite.x - this.sprite.width / 2;
        this.collideRight = this.sprite.x + this.sprite.width / 2;

        this.sprite.anchor.set(0.5);
        this.speedX = speedX;
        this.speedY = speedY;
        this.sprite.vx = 0;
        this.sprite.vy = 1;
        this.isGround = false;
        this.isGoDown = false;
        this.isSeat = false;
        this.cameraRectX = 100;
        this.cameraRectY = 50;

        this.hpMax = 100;
        this.hp = this.hpMax;
        this.experience = 0;
        this.experienceMax = experienceMax;
        this.dead = false;
        this.deadTime = 1.5 * FPS;
        this.jumpPower = 15;
        this.doubleJump = true;
        this.gravitationPower = 0.5;
        this.weaponTime = 10;
        this.weaponCountBullet = 20;
        this.currentWeaponTime = 0;
        this.currentCountBullet = this.weaponCountBullet;
        this.rechargeTime = 3 * 60;
        this.rechargeCircle = new PIXI.Graphics();
        this.currentRechargeTime = this.rechargeTime;
        this.animateType = '';
        this.experienceText = null;

        let radius = 300;
        let blurSize = 50;
        const circle = new PIXI.Graphics().circle(radius + blurSize, radius + blurSize, radius).fill({ color: 0xff0000 });
        circle.filters = [new PIXI.BlurFilter(blurSize)];
        const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
        const texture1 = app.renderer.generateTexture(
            {
                target: circle,
                style: { scaleMode: PIXI.SCALE_MODES.NEAREST },
                resolution: 1,
                frame: bounds,
            }
        );
        this.focusTexture = new PIXI.Sprite(texture1);
        this.focusTexture.tint = 0x000000;
        this.focusTexture.anchor.set(0.5);


        this.updateAnim = function (type)
        {
            if (type === 'idle' && this.animateType !== 'idle')
            {
                this.sprite.loop = false;
                this.sprite.textures = hero_idle;
                this.sprite.animationSpeed = 0.15;
                this.sprite.loop = true;
                this.sprite.play();
                this.animateType = 'idle';
            } else if (type === 'walk' && this.animateType !== 'walk')
            {
                this.sprite.textures = hero_walk;
                this.sprite.animationSpeed = 0.3;
                this.sprite.loop = true;
                this.sprite.play();
                this.animateType = 'walk';
            } else if (type === 'jump')
            {
                this.sprite.textures = hero_jump;
                this.sprite.animationSpeed = 0.3;
                this.sprite.loop = false;
                this.sprite.play();
                this.animateType = 'jump';
            } else if (type === 'dead' && this.animateType !== 'dead')
            {
                this.sprite.textures = hero_dead;
                this.sprite.animationSpeed = 0.3;
                this.sprite.loop = false;
                this.sprite.width = 100;
                this.sprite.height = 80;
                this.sprite.play();
                console.log('смерть');
                this.animateType = 'dead';
            } else if (type === 'shoot')
            {
                this.sprite.textures = hero_shoot;
                this.sprite.animationSpeed = 0.3;
                this.sprite.loop = false;
                this.sprite.play();
                this.ainimateType = 'shoot';
            } else if (type === 'walk_shoot')
            {
                this.sprite.textures = hero_walk_shoot;
                this.sprite.animationSpeed = 0.3;
                this.sprite.loop = true;
                this.sprite.play();
                this.ainimateType = 'walk_shoot';
                window.location.href = "/lose";  // если умер, то проиграл
            }

        }

        this.updateCollide = function ()
        {
            if (this.isSeat) {
                this.collideTop = this.sprite.y;
            }
            else
            {
                this.collideTop = this.sprite.y - this.sprite.height / 2;
            }
            this.collideBottom = this.sprite.y + this.sprite.height / 2 - 6;
            this.collideLeft = this.sprite.x - this.sprite.width / 2 + 10;
            this.collideRight = this.sprite.x + this.sprite.width / 2 - 10;
        }

        this.createBullet = function (mouseX, mouseY)
        {
            if (this.currentWeaponTime <= 0 && this.currentCountBullet > 0)
            {
                let globalPosition = this.sprite.getGlobalPosition();
                let distance = Math.sqrt((globalPosition.x - mouseX) * (globalPosition.x - mouseX) + (globalPosition.y - mouseY) * (globalPosition.y - mouseY));
                let vecX = (mouseX - globalPosition.x) / distance;
                if ((this.sprite.vx > 0 && vecX >= 0) || (this.sprite.vx < 0 && vecX <= 0) || (this.sprite.vx === 0))
                {
                    let vecY = (mouseY - globalPosition.y) / distance;
                    let angle = Math.acos(vecX);
                    if (vecY < 0)
                    {
                        angle *= -1;
                    }
                    let bullet = new Bullet('bullet', this.sprite.x, this.sprite.y, vecX, vecY, angle);
                    this.currentCountBullet -= 1;
                    this.currentWeaponTime = this.weaponTime;
                    bullet.view();
                    bullets.push(bullet);
                    if (vecX > 0 && this.sprite.scale.x < 0)
                    {
                        this.sprite.scale.x *= -1;
                    }
                    if (vecX < 0 && this.sprite.scale.x > 0)
                    {
                        this.sprite.scale.x *= -1;
                    }
                }
            }          
        }

        this.view = function () {
            scene.addChild(this.focusTexture);
            scene.addChild(this.sprite);

            scene.mask = this.focusTexture;
            this.countBulletText = new PIXI.Text(
                this.currentCountBullet,
                {
                    fontFamily: 'Arial',
                    fontSize: 24,
                    fill: 0xfeeb77,
                }
            );
            this.countBulletText.x = 50;
            this.countBulletText.y = 60;
            for (let i = 0; i < 3; i++) {
                let bulletImg = new PIXI.Sprite(PIXI.Texture.from('bullet'));
                bulletImg.x = 10 + 5 * (i + 1);
                bulletImg.y = 60;
                bulletImg.width = 15;
                bulletImg.height = 24;
                app.stage.addChild(bulletImg);
            }

            this.experienceText = new PIXI.Text(this.experience, {fontFamily: 'Arial', fontSize: 24, fill: 0xfeeb77,});
            this.healthText = new PIXI.Text(this.hp, {fontFamily: 'Arial', fontSize: 24, fill: 0xfeeb77,});
            this.experienceTitle = new PIXI.Text('Score', { fontFamily: 'Arial', fontSize: 24, fill: 0xfeeb77, });
            this.healthTitle = new PIXI.Text('Health',{ fontFamily: 'Arial', fontSize: 24, fill: 0xfeeb77,});
            this.healthText.x = 300
            this.healthTitle.x = 30
            this.healthText.y = 15
            this.healthTitle.y = 15
            this.experienceTitle.x = app.screen.width - 300
            this.experienceTitle.y = 15
            this.experienceText.x = app.screen.width  - 30;
            this.experienceText.y = 15;
            this.experienceText.anchor.set(1, 0);
            this.healthText.anchor.set(1, 0);
            app.stage.addChild(this.experienceText);
            app.stage.addChild(this.experienceTitle);

            app.stage.addChild(this.countBulletText);
            this.updateHp();
        }

        this.deleteView = function ()
        {
            scene.removeChild(this.sprite);
        }
        this.updateHp = function ()
        {
            app.stage.removeChild(this.graphicsHp);
            app.stage.removeChild(this.healthTitle);
            app.stage.removeChild(this.healthText);
            this.healthText.text = `${this.hp} / ${this.hpMax}`;
            this.graphicsHp = new PIXI.Graphics();
            this.graphicsHp.rect(15, 15, this.hp / this.hpMax * 300, 30);
            this.graphicsHp.fill(0xde3249);
            this.graphicsHp.rect(15, 15, 300, 30);
            this.graphicsHp.stroke({ width: 2, color: 0xfeeb77 });
            app.stage.addChild(this.graphicsHp);
            app.stage.addChild(this.healthText);
            app.stage.addChild(this.healthTitle);
        }
        this.updateExperience = function ()
        {
            app.stage.removeChild(this.graphicsExperience);
            app.stage.removeChild(this.experienceTitle);
            app.stage.removeChild(this.experienceText);
            this.graphicsExperience = new PIXI.Graphics();
            console.log(this.experience / this.experienceMax)
            this.graphicsExperience.rect(app.screen.width - 300 - 15, 15, this.experience / this.experienceMax * 300, 30);
            this.graphicsExperience.fill(0x4bb35e);
            this.graphicsExperience.rect(app.screen.width - 300 - 15, 15, 300, 30);
            this.graphicsExperience.stroke({ width: 2, color: 0xfeeb77 });
            this.experienceText.text = `${this.experience} / ${this.experienceMax}`;
            app.stage.addChild(this.graphicsExperience);
            app.stage.addChild(this.experienceTitle);
            app.stage.addChild(this.experienceText);
        }
        this.updateWeapon = function (time)
        {
            this.countBulletText.text = this.currentCountBullet
            if (this.currentCountBullet > 0)
            {
                if (this.currentWeaponTime > 0)
                {
                    this.currentWeaponTime -= time.deltaTime;
                }
            }
            else
            {
                app.stage.removeChild(this.rechargeCircle);
                this.rechargeCircle = new PIXI.Graphics();
                let x = 90;
                let y = 72;
                let radius = 10;
                let startAngle = -Math.PI / 2;
                let endAngle = startAngle + (Math.PI / 180) * Math.max(this.currentRechargeTime, 0) / this.rechargeTime * 360;;
                this.rechargeCircle.beginFill(0xfeeb77);
                this.rechargeCircle.moveTo(x, y);
                this.rechargeCircle.arc(x, y, radius, startAngle, endAngle);
                this.rechargeCircle.endFill();
                app.stage.addChild(this.rechargeCircle);
                if (this.currentRechargeTime > 0)
                {
                    this.currentRechargeTime -= time.deltaTime;
                }
                else
                {
                    this.currentWeaponTime = 0;
                    this.currentCountBullet = this.weaponCountBullet;
                    this.currentRechargeTime = this.rechargeTime;
                }
            }
        }
        this.addExperience = function(experience)
        {
            this.experience += experience;
        }
        this.takeDamage = function (damage)
        {
            this.hp -= damage;
            if (this.hp <= 0)
            {
                this.hp = 0;
                this.dead = true;
                this.sprite.vy = 0;
            }
            this.updateHp();
        }
        this.updateKey = function()
        {
            if (keys.keyR) {
                keys.keyR = false;
                this.currentCountBullet = 0;
            }
            if (keys.keyLeft)
            {
                this.sprite.vx = -this.speedX;
                if (this.sprite.scale.x > 0)
                {
                    this.sprite.scale.x *= -1;
                } 
            }
            if (keys.keyRight)
            {
                this.sprite.vx = this.speedX;
                if (this.sprite.scale.x < 0)
                {
                    this.sprite.scale.x *= -1;
                } 
            }
            this.isSeat = false;
            if (keys.keyDown)
            {
                this.isSeat = true;
            }
            if (!keys.keyLeft && !keys.keyRight)
            {
                this.sprite.vx = 0;
            }
            if (keys.keyDownDouble && this.isGoDown) {
                this.sprite.y += 12;
            }
            if (keys.keyUp)
            {
                if (this.isGround)
                {
                    this.updateAnim('jump');
                    this.sprite.vy = -this.jumpPower;
                }
                else
                {
                    if (this.doubleJump && this.sprite.vy > 0)
                    {
                        this.updateAnim('jump');
                        this.sprite.vy = -this.jumpPower;
                        this.doubleJump = false;
                    }
                }
            }
        }
        this.updateMove = function(time)
        {
            if (!this.isGround)
            {
                this.sprite.vy += GRAVITY_ACCELERATION * time.deltaTime;
            }
            else
            {
                if (this.sprite.vy > 0)
                {
                    this.sprite.vy = 0;
                }
                if (!keys.keyLeft && !keys.keyRight)
                {
                    this.sprite.vx = 0;
                    if (this.sprite.vy >= 0)
                    {
                        this.updateAnim('idle');
                    }
                    if (mouse.isDownLeft)
                    {
                        this.updateAnim('shoot');
                    }
                }
                else
                {
                    if (this.ainimateType !== 'walk' && this.sprite.vy >= 0 && !mouse.isDownLeft)
                    {
                        this.updateAnim('walk');
                    }
                    }
                    else if ((this.ainimateType === 'walk' || this.ainimateType === 'shoot') && mouse.isDownLeft)
                    {
                        this.updateAnim('walk_shoot');
                    }
                }
            }
            this.move(time);
        }
        this.move = function (time) {
            this.sprite.x += this.sprite.vx * time.deltaTime;
            this.sprite.y += this.sprite.vy * time.deltaTime;
            this.focusTexture.x = this.sprite.x;
            this.focusTexture.y = this.sprite.y;

            let globalPosition = this.sprite.getGlobalPosition();
            let deltaX = globalPosition.x - app.screen.width / 2; 
            let deltaY = globalPosition.y - app.screen.height / 2;
            if (deltaX > this.cameraRectX)
            {
                let moveX = deltaX - this.cameraRectX;
                moveCamera(moveX, 0);
            }

            if (deltaX < -this.cameraRectX)
            {
                let moveX = deltaX + this.cameraRectX;
                moveCamera(moveX, 0);
            }
            //if (this.isGround) {
                if (deltaY < -this.cameraRectY)
                {
                    let moveY = (deltaY + this.cameraRectY) / 10;
                    moveCamera(0, moveY);
                    this.moveCamTime
                }
            //}
            if (deltaY > this.cameraRectY)
            {
                let moveY = deltaY - this.cameraRectY;
                moveCamera(0, moveY);
            }


        }
        this.update = function (time)
        {
            if (!this.dead)
            {
                this.updateKey();
                this.updateMove(time);
                this.updateWeapon(time);
                this.collise();
            }
            else
            {
                this.deadTime -= time.deltaTime;
                this.updateAnim('dead');
                this.sprite.vx = 0;
                if (!this.isGround)
                {
                    this.sprite.vy += GRAVITY_ACCELERATION / 5 * time.deltaTime;
                } else {
                    this.sprite.vy = 0;
                }
                this.move(time);
                this.collise();
            }
            this.updateExperience();
            this.updateCollide();
        }

        this.collise = function ()
        {
            this.isGoDown = false;
            this.updateCollide();
            if (this.collideLeft < 0)
            {
                this.sprite.x -= this.collideLeft;
            }
            if (this.collideRight > SCENE_WIDTH)
            {
                this.sprite.x -= this.collideRight - SCENE_WIDTH;
            }
            if (this.collideBottom > SCENE_HEIGHT)
            {
                this.sprite.y -= this.collideBottom - SCENE_HEIGHT;
                this.isGround = true;
                this.doubleJump = true;
            }
            if (this.sprite.vy < 0)
            {
                for (let i = 0; i < platforms.length; i++)
                {
                    let platform = platforms[i];
                    if (this.collideTop >= platform.collideTop + this.sprite.vy &&
                        this.collideTop <= platform.collideBottom &&
                        this.collideRight <= platform.collideRight &&
                        this.collideLeft >= platform.collideLeft
                    )
                    {
                        this.sprite.vy = 0;
                        this.doubleJump = false;
                        break;
                    }
                }
            }
            if (this.sprite.vy >= 0)
            {
                for (let i = 0; i < woodenPlanks.length; i++)
                {
                    let woodenPlank = woodenPlanks[i];
                    if (this.collideBottom <= woodenPlank.collideBottom + this.sprite.vy &&
                        this.collideBottom >= woodenPlank.collideTop &&
                        this.sprite.x <= woodenPlank.collideRight &&
                        this.sprite.x >= woodenPlank.collideLeft
                    )
                    {
                        this.isGround = true;
                        this.isGoDown = true;
                        this.doubleJump = true;
                        if (this.sprite.vy > 1)
                        {
                            this.sprite.y -= (this.collideBottom - woodenPlank.collideTop);
                        } else
                        {
                            this.sprite.y -= (this.collideBottom - woodenPlank.collideTop) / 4;
                        }
                        break;
                    }
                }
                if (!this.isGround) {
                    for (let i = 0; i < platforms.length; i++)
                    {
                        let platform = platforms[i];
                        if (this.collideBottom <= platform.collideBottom + this.sprite.vy &&
                            this.collideBottom >= platform.collideTop &&
                            this.collideLeft <= platform.collideRight &&
                            this.collideRight >= platform.collideLeft
                        )
                        {
                            this.isGround = true;
                            this.doubleJump = true;
                            if (this.sprite.vy > 1)
                            {
                                this.sprite.y -= (this.collideBottom - platform.collideTop);
                            } else
                            {
                                this.sprite.y -= (this.collideBottom - platform.collideTop) / 4;
                            }
                            break;
                        }
                    }
                }
            }
        } 
    }
}