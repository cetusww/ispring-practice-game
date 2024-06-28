class Hero {
    constructor(texture, posX, posY, speedX, speedY) {


        // const sheet = PIXI.Assets.get('hero-group').data;
        // // console.log(sheet.animations["walk"])
        // this.sprite = PIXI.AnimatedSprite.from(['walk01', 'walk02', 'walk03']);

        // // // Настройте анимированный спрайт
        //  this.sprite.animationSpeed = 0.1; // Скорость анимации
        //  this.sprite.loop = true; // Зацикливание анимации
        //  this.sprite.play(); // Запуск анимации

        //this.sprite = PIXI.Sprite.from('walk01');
        this.sprite = PIXI.Sprite.from(texture);
        this.sprite.x = posX
        this.sprite.y = posY
        this.sprite.width = 60
        this.sprite.height = 85

        this.collideTop = this.sprite.y - this.sprite.height / 2
        this.collideBottom = this.sprite.y + this.sprite.height / 2
        this.collideLeft = this.sprite.x - this.sprite.width / 2
        this.collideRight = this.sprite.x + this.sprite.width / 2

        this.sprite.anchor.set(0.5)
        this.speedX = speedX
        this.speedY = speedY
        this.sprite.vx = 0
        this.sprite.vy = 1
        this.isGround = false
        this.cameraRectX = 100
        this.cameraRectY = 10

        this.jumpPower = 12
        this.doubleJump = true
        this.gravitationPower = 0.5
        this.weaponTime = 10
        this.weaponCountBullet = 20
        this.currentWeaponTime = 0
        this.currentCountBullet = this.weaponCountBullet
        this.rechargeTime = 300
        this.currentRechargeTime = this.rechargeTime

        this.updateCollide = function () {
            this.collideTop = this.sprite.y - this.sprite.height / 2
            this.collideBottom = this.sprite.y + this.sprite.height / 2
            this.collideLeft = this.sprite.x - this.sprite.width / 2
            this.collideRight = this.sprite.x + this.sprite.width / 2
        }

        this.createBullet = function (mouseX, mouseY) {
            if (this.currentWeaponTime <= 0 && this.currentCountBullet > 0) {
                let globalPosition = this.sprite.getGlobalPosition()
                let distance = Math.sqrt((globalPosition.x - mouseX)*(globalPosition.x - mouseX) + (globalPosition.y - mouseY)*(globalPosition.y - mouseY))
                let vecX = (mouseX - globalPosition.x) / distance
                if ((this.sprite.vx > 0 && vecX >= 0) || (this.sprite.vx < 0 && vecX <= 0) || (this.sprite.vx == 0)){
                    let vecY = (mouseY - globalPosition.y) / distance
                    let angle = Math.acos(vecX)
                    if (vecY < 0) {
                        angle *= -1
                    }
                    let bullet = new Bullet('bullet', this.sprite.x, this.sprite.y, vecX, vecY, angle)
                    this.currentCountBullet -= 1
                    if (this.currentRechargeTime)
                    this.currentWeaponTime = this.weaponTime
                    bullet.view()
                    bullets.push(bullet)
                }
            }          
        }

        this.view = function () {
            scene.addChild(this.sprite);
        }

        this.deleteView = function () {
            scene.removeChild(this.sprite);
        }
        this.updateWeapon = function (time) {
            if (this.currentCountBullet > 0) {
                if (this.currentWeaponTime > 0) {
                    this.currentWeaponTime -= time.deltaTime
                }
            } else {
                if (this.currentRechargeTime > 0) {
                    this.currentRechargeTime -= time.deltaTime
                } else {
                    this.currentWeaponTime = 0
                    this.currentCountBullet = this.weaponCountBullet
                    this.currentRechargeTime = this.rechargeTime
                }
            }  
        }
        this.update = function (time) {
            if (keys.keyLeft) {
                this.sprite.vx = -this.speedX
                if (this.sprite.scale.x > 0)
                {
                    this.sprite.scale.x *= -1
                } 
            }
            if (keys.keyRight) {
                this.sprite.vx = this.speedX
                if (this.sprite.scale.x < 0)
                {
                    this.sprite.scale.x *= -1
                } 
            }
            if (!keys.keyLeft && !keys.keyRight) {
                this.sprite.vx = 0
            }
            if (keys.keyUp) {
                if (this.isGround) {
                    this.sprite.vy = -this.jumpPower
                } else {
                    if (this.doubleJump && this.sprite.vy > 0) {
                        this.sprite.vy = -this.jumpPower
                        this.doubleJump = false
                    }
                }
            }

            if (!this.isGround) {
                this.sprite.vy += this.gravitationPower * time.deltaTime
                //console.log(this.sprite.y)
            } else {
                if (this.sprite.vy > 0) {
                    this.sprite.vy = 0
                } 
            }
            this.sprite.x += this.sprite.vx * time.deltaTime
            this.sprite.y += this.sprite.vy * time.deltaTime
            
            let globalPosition = this.sprite.getGlobalPosition()
            let deltaX = globalPosition.x - app.screen.width / 2 
            if (deltaX > this.cameraRectX && this.sprite.scale.x > 0) {
                let moveX = deltaX - this.cameraRectX
                moveCamera(moveX, 0)
            }

            if (deltaX < -this.cameraRectX && this.sprite.scale.x < 0) {
                let moveX = deltaX + this.cameraRectX
                moveCamera(moveX, 0)
            }
            this.updateWeapon(time)
            this.collise()
        }

        this.collise = function () {
            this.isGround = false
            if (this.sprite.vy >= 0) {
                this.updateCollide()
                platforms.forEach(platform => {
                    if (this.collideBottom <= platform.collideBottom + this.sprite.vy &&
                        this.collideBottom >= platform.collideTop &&
                        this.collideLeft <= platform.collideRight &&
                        this.collideRight >= platform.collideLeft
                    ) {
                        this.isGround = true
                        this.doubleJump = true
                        if (this.sprite.vy > 1) {
                            this.sprite.y -= (this.collideBottom - platform.collideTop)
                        } else {
                            this.sprite.y -= (this.collideBottom - platform.collideTop) / 4
                        }     
                    }
                })
            }
        } 
    }
}