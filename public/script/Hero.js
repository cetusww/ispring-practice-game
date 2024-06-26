class Hero {
    constructor(texture, posX, posY, speedX, speedY) {
        //this.sprite = new PIXI.Sprite(texture);
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
        this.up.press = () => {
            let bullet = new Bullet('/images/bullet.svg', this.sprite.x, this.sprite.y, 1, 1)
            bullet.view()
            console.log('+')
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
            app.stage.addChild(this.sprite);
        }

        this.deleteView = function () {
            app.stage.removeChild(this.sprite);
        }

        this.update = function (time) {
            this.sprite.x += this.sprite.vx * time.deltaTime

            let deltaX = this.sprite.x - app.screen.width / 2 
            if (deltaX > this.cameraRectX && this.sprite.scale.x > 0) {
                let moveX = deltaX - this.cameraRectX
                let move = moveCamera(moveX, 0)
                this.sprite.x -= move.x
            }

            if (deltaX < -this.cameraRectX && this.sprite.scale.x < 0) {
                let moveX = deltaX + this.cameraRectX
                let move = moveCamera(moveX, 0)
                this.sprite.x -= move.x
            }
            this.collise()
        }

        this.collise = function () {
            objects.forEach(object => {
                //console.log(intersects(this.sprite, object.sprite))
            })
        }

        
    }
}