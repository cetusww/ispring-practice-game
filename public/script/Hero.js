class Hero {
    constructor(texture, posX, posY, speedX, speedY) {
        this.sprite = PIXI.Sprite.from(texture);
        this.sprite.x = posX
        this.sprite.y = posY
        this.sprite.width = 60
        this.sprite.height = 85
        this.sprite.anchor.set(0.5)
        this.speedX = speedX
        this.speedY = speedY
        this.sprite.vx = 0
        this.sprite.vy = 0
        this.left = keyboard(37)
        this.up = keyboard(38)
        this.right = keyboard(39)
        this.down = keyboard(40)
        this.isGroung = false
        this.cameraRectX = 100
        this.cameraRectY = 10


        this.weaponTime = 10
        this.weaponCountBullet = 20
        this.currentWeaponTime = 0
        this.currentCountBullet = this.weaponCountBullet
        this.rechargeTime = 300
        this.currentRechargeTime = this.rechargeTime
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
                    let bullet = new Bullet('/images/bullet.svg', this.sprite.x, this.sprite.y, vecX, vecY, angle)
                    this.currentCountBullet -= 1
                    if (this.currentRechargeTime)
                    this.currentWeaponTime = this.weaponTime
                    bullet.view()
                    bullets.push(bullet)
                }
            }          
        }
        this.left.press = () => {
            this.sprite.vx = -this.speedX;
            this.right.isDown = false;
            this.right.isUp = true;
            if (this.sprite.scale.x > 0)
            {
                this.sprite.scale.x *= -1;
            } 
        };
        this.left.release = () => {
            if (!this.right.isDown && this.sprite.vy === 0) {
              this.sprite.vx = 0;
            }
        };

        this.right.press = () => {
            this.sprite.vx = this.speedX;
            this.left.isDown = false;
            this.left.isUp = true;
            if (this.sprite.scale.x < 0)
            {
                this.sprite.scale.x *= -1;
            }  
        }

        this.right.release = () => {
            if (!this.left.isDown && this.sprite.vy === 0) {
              this.sprite.vx = 0;
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
            this.sprite.x += this.sprite.vx * time.deltaTime
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
            platforms.forEach(platform => {
                //console.log(intersects(this.sprite, platform.sprite))
            })
        }

        
    }
}