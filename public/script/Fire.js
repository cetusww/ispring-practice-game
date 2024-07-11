class Fire
{
    constructor(posX, posY)
    {   
        this.sprite = new PIXI.AnimatedSprite(fire_anim);
        this.sprite.animationSpeed = 1; // Скорость анимации
        this.sprite.loop = true; // Зацикливание анимации
        this.sprite.play(); // Запуск анимации

        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 128;
        this.sprite.height = 128;
        this.sprite.anchor.set(0.5);
        
        this.view = function ()
        {
            scene.addChild(this.sprite);
        }

        this.deleteView = function ()
        {
            scene.removeChild(this.sprite);
        }

        this.update = function ()
        {         
            if (hero.collideLeft <= this.sprite.x && hero.collideRight >= this.sprite.x &&
            hero.collideBottom >= this.sprite.y && hero.collideTop <= this.sprite.y
            )
            {
                hero.takeDamage(1);
                // console.log('FIRE!');
            }  
        }
    }
}