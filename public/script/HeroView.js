class HeroView
{
    constructor(posX, posY)
    {
        this.sprite = new PIXI.AnimatedSprite(hero_idle);
        this.sprite.animationSpeed = 0.2; // Скорость анимации
        this.sprite.loop = true; // Зацикливание анимации
        this.sprite.play(); // Запуск анимации

        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 78;
        this.sprite.height = 95;

        this.collideTop = this.sprite.y - this.sprite.height / 2;
        this.collideBottom = this.sprite.y + this.sprite.height / 2;
        this.collideLeft = this.sprite.x - this.sprite.width / 2;
        this.collideRight = this.sprite.x + this.sprite.width / 2;

        this.sprite.anchor.set(0.5);        

        this.hpMax = 100;
        this.hp = this.hpMax;
        this.dead = false;
        this.deadTime = 1.5 * FPS;
        this.animateType = '';
        this.name = 'bot';
    }


    updateAnim(type) {
        if (type === 'idle' && this.animateType !== 'idle') {
            this.sprite.loop = false;
            this.sprite.textures = hero_idle;
            this.sprite.animationSpeed = 0.15;
            this.sprite.loop = true;
            this.sprite.play();
            this.animateType = 'idle';
        } else if (type === 'walk' && this.animateType !== 'walk') {
            this.sprite.textures = hero_walk;
            this.sprite.animationSpeed = 0.3;
            this.sprite.loop = true;
            this.sprite.play();
            this.animateType = 'walk';
        } else if (type === 'jump') {
            this.sprite.textures = hero_jump;
            this.sprite.animationSpeed = 0.3;
            this.sprite.loop = false;
            this.sprite.play();
            this.animateType = 'jump';
        } else if (type === 'dead' && this.animateType !== 'dead') {
            this.sprite.textures = hero_dead;
            this.sprite.animationSpeed = 0.3;
            this.sprite.loop = false;
            this.sprite.width = 100;
            this.sprite.height = 80;
            this.sprite.play();
            console.log('смерть');
            this.animateType = 'dead';
        } else if (type === 'shoot' && this.animateType !== 'shoot') {
            this.sprite.textures = hero_shoot;
            this.sprite.animationSpeed = 0.3;
            this.sprite.loop = false;
            this.sprite.play();
            this.animateType = 'shoot';
        } else if (type === 'walk_shoot' && this.animateType !== 'walk_shoot') {
            this.sprite.textures = hero_walk_shoot;
            this.sprite.animationSpeed = 0.3;
            this.sprite.loop = true;
            this.sprite.play();
            this.animateType = 'walk_shoot';
        }
    }

    updateCollide()
    {
        this.collideTop = this.sprite.y - this.sprite.height / 2 + 10;
        this.collideBottom = this.sprite.y + this.sprite.height / 2 - 6;
        this.collideLeft = this.sprite.x - this.sprite.width / 2 + 10;
        this.collideRight = this.sprite.x + this.sprite.width / 2 - 10;
    }

    view()
    {
        scene.addChild(this.sprite);
        this.updateHp();

        this.nameText = new PIXI.Text(this.name, {fontFamily: 'Arial', fontSize: 14, fill: 0xdddddd,});
        this.nameText.x = this.sprite.x;
        this.nameText.y = this.sprite.y - this.sprite.height / 2 - 14;
        this.nameText.anchor.set(0.5);
        scene.addChild(this.nameText);
    }

    deleteView()
    {
        scene.removeChild(this.sprite);
        scene.removeChild(this.graphics);
    }

    updateName()
    {
        this.nameText.text = this.name;
        this.nameText.x = this.sprite.x;
        this.nameText.y = this.sprite.y - this.sprite.height / 2 - 14;
    }

    updateHp()
    {
        scene.removeChild(this.graphics);
        this.graphics = new PIXI.Graphics();
        this.graphics.rect(this.sprite.x - this.sprite.width / 2 + 5, this.sprite.y - this.sprite.height / 2 - 3, this.hp / this.hpMax * (this.sprite.width - 10), 5);
        this.graphics.fill(0xde3249);
        this.graphics.rect(this.sprite.x - this.sprite.width / 2 + 5, this.sprite.y - this.sprite.height / 2 - 3, this.sprite.width - 10, 5);
        this.graphics.stroke({ width: 1, color: 0xfeeb77 });
        scene.addChild(this.graphics);
    }
    addShield(duration)
    {
        this.activateShield = true;
        this.shieldDuration = duration;
        this.shieldStartTime = performance.now();
    }
    shieldView() {
        this.shieldImage = new PIXI.Sprite(PIXI.Texture.from('shield_active')); // отображение щита
        this.shieldImage.x = this.sprite.x - 9;
        this.shieldImage.y = this.sprite.y;
        this.shieldImage.anchor.set(0.5);
        this.shieldImage.width = 180;
        this.shieldImage.height = 180;
        scene.addChild(this.shieldImage);
    }

    shieldDeleteView() {
        scene.removeChild(this.shieldImage);
    }

    takeDamage(damage)
    {
        if (!this.activateShield)
        {
            this.hp -= damage;
            if (this.hp <= 0)
            {
                this.hp = 0;
                this.dead = true;
                this.sprite.vy = 0;
            }
            this.updateHp();
        } else
        {
            damage = Math.max(0, damage - 10);
        }
    }
    updateMove(x, y) 
    {             
        this.sprite.x = x;
        this.sprite.y = y;
    }
   
    update(time)
    {
        if (!this.dead)
        {
            this.updateHp();
            //this.updateMove(x, y);
            this.updateName();
            this.updateCollide();
            this.shieldDeleteView();
            if (this.activateShield)
            {   
                this.shieldView();
            }
        }
        else 
        {
            this.deadTime -= time.deltaTime;
        }
    }
}