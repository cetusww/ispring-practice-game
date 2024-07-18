class Mushroom {
    constructor(posX, posY, visibilityZoneWidth, attackZoneWidth, experience) {
        this.sprite = new PIXI.AnimatedSprite(mushroom_idle);
        this.sprite.animationSpeed = 0.03;      // Скорость анимации
        this.sprite.loop = true;                // Зацикливание анимации
        this.sprite.play();                     // Запуск анимации

        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 58;
        this.sprite.height = 56;
        this.sprite.anchor.set(0.5);

        this.collideTop = this.sprite.y - this.sprite.height / 2;
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideLeft = this.sprite.x - this.sprite.width / 2;
        this.collideRight = this.sprite.x + this.sprite.width / 2;

        this.visibilityZoneWidth = visibilityZoneWidth;
        this.attackZoneWidth = attackZoneWidth;

        this.timeAttack = 100;
        this.currentTimeAttack = 0;
        this.maxHp = 200;
        this.hp = 200;
        this.experience = experience;

        this.animateType = '';  // left_idle, left_active, right_idle, right_active
        this.deadTime = 1 * FPS;
    }

    updateAnim(type) {
        if (type === 'right_active' && this.animateType !== 'right_active') {
            this.sprite.textures = mushroom_active;
            this.sprite.loop = true;
            if (this.sprite.scale.x < 0) {
                this.sprite.scale.x *= -1;
            }
            this.sprite.play();
            this.animateType = 'right_active';
        }
        else if (type === 'left_active' && this.animateType !== 'left_active') {
            this.sprite.textures = mushroom_active;
            this.sprite.loop = true;
            if (this.sprite.scale.x > 0) {
                this.sprite.scale.x *= -1;
            }
            this.sprite.play();
            this.animateType = 'left_active';
        }
        else if (type === 'idle' && this.animateType !== 'idle') {
            this.sprite.textures = mushroom_idle;
            this.sprite.loop = true;
            this.sprite.play();
            this.animateType = 'idle';
        }
    }

    updateState() {
        if (hero.collideLeft <= this.sprite.x + this.visibilityZoneWidth &&
            hero.collideLeft + hero.sprite.width / 2 > this.sprite.x &&
            hero.collideBottom >= this.sprite.y &&
            hero.collideTop <= this.sprite.y) {
            this.updateAnim('right_active');
        }
        else if (hero.collideRight >= this.sprite.x - this.visibilityZoneWidth &&
            hero.collideRight - hero.sprite.width / 2 < this.sprite.x &&
            hero.collideBottom >= this.sprite.y - this.sprite.height / 2 &&
            hero.collideTop <= this.sprite.y + this.sprite.height / 2) {
            this.updateAnim('left_active');
        }
        else {
            this.updateAnim('idle');
        }
    }

    view() {
        scene.addChild(this.sprite);
        this.updateHp();
    }

    deleteView() {
        scene.removeChild(this.sprite);
        scene.removeChild(this.graphics);
    }

    createSmoke(direction) {
        if (this.currentTimeAttack <= 0) {
            let vecX;
            let smokeStart
            if (direction === 'right') {
                vecX = 1;
                smokeStart = this.sprite.x + this.sprite.width / 2 + 15;
            }
            else {
                vecX = -1;
                smokeStart = this.sprite.x - this.sprite.width / 2 - 15;
            }
            const smoke = new Smoke(smokeStart, this.sprite.y, vecX, 10);
            smoke.view();
            smokes.push(smoke);

            let audio = new Audio('/sounds/shipenie.ogg');
            audio.volume = 0.3;
            audio.load();
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

    updateAggression() {
        if (!hero.dead) {
            if (hero.collideLeft <= this.sprite.x + this.attackZoneWidth &&
                hero.collideLeft + hero.sprite.width / 2 > this.sprite.x &&
                hero.collideBottom >= this.sprite.y &&
                hero.collideTop <= this.sprite.y) {
                this.createSmoke('right');
            }
            else if (hero.collideRight >= this.sprite.x - this.attackZoneWidth &&
                hero.collideRight - hero.sprite.width / 2 < this.sprite.x &&
                hero.collideBottom >= this.sprite.y - this.sprite.height / 2 &&
                hero.collideTop <= this.sprite.y + this.sprite.height / 2) {
                this.createSmoke('left');
            }
        }
    }

    dropExperience() {
        let randomCount = Math.floor(Math.random() * 5) + 2;
        let experienceCount = Math.floor(this.experience / randomCount);
        console.log('+', randomCount);
        let i = -Math.floor(randomCount / 2)
        for (i; i < randomCount - Math.floor(randomCount / 2) - 1; i++) {
            let experience = new Experience(this.sprite.x + i * 20, this.collideBottom - 5, experienceCount);
            experience.view();
            experiences.push(experience);
        }
        let experience = new Experience(this.sprite.x + i * 20, this.collideBottom - 5, this.experience - experienceCount * (randomCount - 1))
        experience.view();
        experiences.push(experience);
    }

    update(time) {
        if (!this.dead) {
            if (this.currentTimeAttack > 0) {
                this.currentTimeAttack -= 1 * time.deltaTime;
            }
            this.updateHp();
            this.updateState();
            this.updateAggression();
        }
        else {
            this.deadTime -= time.deltaTime;
        }
    }
}