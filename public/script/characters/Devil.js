class Devil {
    constructor(posX, posY, zoneWidth, zoneHeight, visibilityZoneWidth, visibilityZoneHeight, experience) {
        this.sprite = new PIXI.AnimatedSprite(devil_idle);
        this.sprite.animationSpeed = 0.05; // Скорость анимации
        this.sprite.loop = true; // Зацикливание анимации
        this.sprite.play(); // Запуск анимации

        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 48;
        this.sprite.height = 60;

        this.collideTop = this.sprite.y - this.sprite.height / 2;
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideLeft = this.sprite.x - this.sprite.width / 2;
        this.collideRight = this.sprite.x + this.sprite.width / 2;

        this.sprite.anchor.set(0.5);
        this.speedX = 2;
        this.speedY = 0;
        this.sprite.vx = this.speedX;
        this.sprite.vy = 0;

        this.zoneWidth = zoneWidth;
        this.zoneHeight = zoneHeight;
        this.zoneX = posX;
        this.zoneY = posY;
        this.visibilityZoneWidth = visibilityZoneWidth;
        this.visibilityZoneHeight = visibilityZoneHeight;

        this.ainimateType = '';
        this.timeAttack = 50;
        this.currentTimeAttack = 0;
        this.maxHp = 100;
        this.hp = 100;
        this.experience = experience;

        this.angle = 3.1415 * 30 / 180;
        this.deadTime = 1 * FPS;
        this.state = 0; // 0 - стоять, 1 - ходить
        this.stateTime = Math.random() * FPS;
        this.animateType = 'idle';
    }

    updateAnim(type) {
        if (type === 'idle' && this.animateType !== 'idle') {
            this.sprite.loop = false;
            this.sprite.textures = devil_idle;
            this.sprite.animationSpeed = 0.05;
            this.sprite.loop = false;
            this.sprite.play();
            this.animateType = 'idle';
        } else if (type === 'walk' && this.animateType !== 'walk') {
            this.sprite.textures = devil_walk;
            this.sprite.animationSpeed = 0.07;
            this.sprite.loop = true;
            this.sprite.play();
            this.animateType = 'walk';
        }
    }

    view() {
        scene.addChild(this.sprite);
        this.updateHp();
    }

    updateCollide() {
        this.collideTop = this.sprite.y - this.sprite.height / 2;
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideLeft = this.sprite.x - this.sprite.width / 2;
        this.collideRight = this.sprite.x + this.sprite.width / 2;
    }

    deleteView() {
        scene.removeChild(this.sprite);
        scene.removeChild(this.graphics);
    }

    createFireball(heroX, heroY) {
        if (this.currentTimeAttack <= 0) {
            let distanceX = heroX - this.sprite.x;
            let tanAngle = Math.tan(this.angle);
            let vecX = Math.sqrt(Math.abs(distanceX / 100) * GRAVITY_ACCELERATION / 2 / tanAngle);
            let vecY = vecX * tanAngle;
            if (distanceX < 0) {
                vecX *= -1;
            }
            const fireball = new Fireball('fireball', this.sprite.x, this.sprite.y, vecX, -vecY, 0, 5);
            fireball.view();
            fireballs.push(fireball);
            let audio = new Audio('/sounds/fireball.mp3');
            audio.volume = 0.5;
            audio.loop = false;
            audio.play();
            this.currentTimeAttack = this.timeAttack;
        }
    }

    updateHp() {
        scene.removeChild(this.graphics);
        this.graphics = new PIXI.Graphics();
        this.graphics.rect(this.sprite.x - this.sprite.width / 2 + 5, this.sprite.y - this.sprite.height / 2 - 7, this.hp / this.maxHp * (this.sprite.width - 10), 5);
        this.graphics.fill(0xde3249);
        this.graphics.rect(this.sprite.x - this.sprite.width / 2 + 5, this.sprite.y - this.sprite.height / 2 - 7, this.sprite.width - 10, 5);
        this.graphics.stroke({ width: 1, color: 0xfeeb77 });
        scene.addChild(this.graphics);
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.dead = true;
        }
        this.updateHp();
    }

    updateMove(time) {
        if (this.stateTime > 0) {
            this.stateTime -= time.deltaTime;
        }
        else {
            if (Math.random() > 0.4) {
                this.state = 1;
                this.stateTime = (Math.random() + 1) * 2 * FPS;
                this.updateAnim('walk');
            } else {
                this.state = 0;
                this.stateTime = (Math.random() + 0.5) * FPS;
                this.updateAnim('idle');
            }
        }
        if (this.state === 1) {
            this.sprite.x += this.sprite.vx * time.deltaTime;
            this.updateCollide();
            if (this.collideLeft <= this.zoneX - this.zoneWidth) {
                this.sprite.vx *= -1;
                this.sprite.x += (this.zoneX - this.zoneWidth) - this.collideLeft;
            }
            else if (this.collideRight >= this.zoneX + this.zoneWidth) {
                this.sprite.vx *= -1;
                this.sprite.x -= this.collideRight - (this.zoneX + this.zoneWidth);
            }
        }
        if ((this.sprite.scale.x < 0 && this.sprite.vx > 0) || (this.sprite.scale.x > 0 && this.sprite.vx < 0)) {
            this.sprite.scale.x *= -1;
        }
    }

    updateAggression() {
        if (!hero.dead) {
            if (hero.collideRight >= this.sprite.x - this.visibilityZoneWidth &&
                hero.collideLeft <= this.sprite.x + this.visibilityZoneWidth &&
                hero.collideBottom <= this.collideBottom + 10 && hero.collideBottom >= this.collideBottom - this.zoneHeight - this.visibilityZoneHeight
            ) {
                this.createFireball(hero.sprite.x, hero.sprite.y);
            }
        }
    }

    dropExperience() {
        if (this.experience > 0) {
            let randomCount = Math.floor(Math.random() * 5) + 2;
            let experienceCount = Math.floor(this.experience / randomCount);
            console.log('+', randomCount);
            let i = -Math.floor(randomCount / 2)
            for (i; i < randomCount - Math.floor(randomCount / 2) - 1; i++) {
                let experience = new Experience(this.sprite.x + i * 20, this.collideBottom - 5, experienceCount);
                experience.view();
                experiences.push(experience);
            }
            let experience = new Experience(this.sprite.x + i * 20, this.collideBottom - 5, this.experience - experienceCount * (randomCount - 1));
            experience.view();
            experiences.push(experience);
        }
    }

    update(time) {
        if (!this.dead) {
            if (this.currentTimeAttack > 0) {
                this.currentTimeAttack -= 1 * time.deltaTime;
            }
            this.updateHp();
            this.updateMove(time);
            this.updateAggression();
            this.updateCollide();
        }
        else {
            this.deadTime -= time.deltaTime;
        }
    }
}