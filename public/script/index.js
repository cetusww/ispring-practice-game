const SCENE_WIDTH = 2000//window.innerWidth
const SCENE_HEIGHT = window.innerHeight
const FPS = 60;
const scene = new PIXI.Container();
const platforms = [];
const bullets = [];
const fireballs = [];
const enemys = [];
const app = new PIXI.Application();
const GRAVITY_ACCELERATION = 0.98;
let background;
let hero;
const hero_walk = [];
const hero_jump = [];
const hero_idle = [];
const hero_dead = [];
const greenCapEnemyIdle = [];
const greenCapEnemyWalk = [];
const keys =
{
    keyDown: false,
    keyUp: false,
    keyLeft: false,
    keyRight: false,
    keyR: false,
}
const mouse =
{
    isDownLeft: false,
    positionX: 0,
    positionY: 0,
}
function onAppMouseDown(event)
{
    if (event.button === 0)
    {
        mouse.isDownLeft = true;
    }
}
function onAppMouseMove(event)
{
    if (event.button === 0)
    {
        mouse.positionX = event.clientX;
        mouse.positionY = event.clientY;
    }
}
function onAppMouseUp(event)
{
    if (event.button === 0)
    {
        mouse.isDownLeft = false;
    }
}

function onKeyDown(event)
{
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'ф')
    {
        keys.keyLeft = true;
        keys.keyRight = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'в')
    {
        keys.keyRight = true;
        keys.keyLeft = false;
    }
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'ц')
    {
        keys.keyUp = true;
        keys.keyDown = false;
    }
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'ы')
    {
        keys.keyDown = true;
        keys.keyUp = false;
    }
    if (event.key === 'r' || event.key === 'к')
    {
        keys.keyR = true;
    }
}
function onKeyUp(event)
{
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'ф')
    {
        keys.keyLeft = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'в')
    {
        keys.keyRight = false;
    }
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'ы')
    {
        keys.keyDown = false;
    }
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'ц')
    {
        keys.keyUp = false;
    }
}

(async () =>
{
    await app.init({ background: '#000000',  resizeTo: window });
    document.body.appendChild(app.canvas);

    await PIXI.Assets.load([
        { alias: 'background', src: '/images/level1-map.jpg' },
        { alias: 'hero_walk_group', src: '/images/hero_walk_group.json' },
        { alias: 'hero_idle_group', src: '/images/hero_idle_group.json' },
        { alias: 'hero_jump_group', src: '/images/hero_jump_group.json' }, 
        { alias: 'hero_dead_group', src: '/images/hero_dead_group.json' }, 
        { alias: 'enemy', src: '/images/green_cap_enemy.json' },
        { alias: 'hero', src: '/images/hero.svg' },
        { alias: 'ground', src: '/images/ground.svg' },
        { alias: 'bullet', src: '/images/bullet.svg' },
        { alias: 'fireball', src: '/images/fireball.svg' },
    ])
    for (let i = 0; i < 10; i++)
    {
        hero_idle.push(PIXI.Texture.from(`idle${1 + i}.png`));
    }
    for (let i = 0; i < 10; i++)
    {
        hero_walk.push(PIXI.Texture.from(`walk${1 + i}.png`));
    }
    for (let i = 0; i < 10; i++)
    {
        hero_jump.push(PIXI.Texture.from(`jump${1 + i}.png`));
    }
    for (let i = 9; i < 10; i++)
    {
        hero_dead.push(PIXI.Texture.from(`dead${1 + i}.png`));
    }
    greenCapEnemyIdle.push(PIXI.Texture.from(`enemyIdle1.png`));
    for (let i = 0; i < 4; i++)
    {
        greenCapEnemyWalk.push(PIXI.Texture.from(`enemyWalk${1 + i}.png`));
    }

    background = PIXI.Sprite.from('background');
    background.anchor.set(0);

    function resizeBackground()
    {
        background.width = SCENE_WIDTH;
        background.height = SCENE_HEIGHT;
    }

    resizeBackground();
    console.log(background.height)
    scene.addChild(background);

    app.canvas.addEventListener('mousedown', onAppMouseDown);
    app.canvas.addEventListener('mousemove', onAppMouseMove);
    app.canvas.addEventListener('mouseup', onAppMouseUp);
    levelCreate();
    app.stage.addChild(scene);
    hero = new Hero(300, 300, 6, 0);
    hero.view();
    app.ticker.maxFPS = FPS;
    app.ticker.add((time) =>
    {
        hero.update(time);
        if (mouse.isDownLeft)
        {
            hero.createBullet(mouse.positionX, mouse.positionY);
        }
        
        let i = 0;
        while (i < enemys.length)
        {
            if (enemys[i].deadTime > 0)
            {
                enemys[i].update(time);
            }
            else
            {
                enemys[i].deleteView();
                enemys[i].sprite.destroy();
                enemys.splice(i, 1);
                i--;
            }
            i++;
        }
        i = 0;
        while (i < bullets.length)
        {
            if (bullets[i].lifeTime > 0)
            {
                bullets[i].update(time);
            }
            else
            {
                bullets[i].sprite.destroy();
                bullets.splice(i, 1);
                i--;
            }
            i++;
        }
        i = 0;
        while (i < fireballs.length)
        {
            if (fireballs[i].lifeTime > 0)
            {
                fireballs[i].update(time);
            }
            else
            {
                fireballs[i].sprite.destroy();
                fireballs.splice(i, 1);
                i--;
            }
            i++;
        }
    });
})();

function moveCamera(x, y)
{
    let moveX = x;
    let moveY = y;
    if (scene.x - x > 0)
    {
        moveX = scene.x;
        scene.x -= moveX;
    }
    else if (scene.x - x < app.screen.width - SCENE_WIDTH)
    {
        moveX = (scene.x + SCENE_WIDTH - app.screen.width);
        scene.x -= moveX;
    }
    else
    {
        scene.x -= moveX;
    }
    scene.y += y;
}

window.addEventListener('keydown', onKeyDown)
window.addEventListener('keyup', onKeyUp)

function levelCreate()
{
    let texture = PIXI.Texture.from('ground');
    enemys.push(new Enemy(300, 350, 100, 0, 150, 50));
    enemys.push(new Enemy(900, 350, 100, 0, 150, 50));
    platforms.push(new Ground(texture, 89, 250, 178, 40));
    platforms.push(new Ground(texture, 300, 400, 178, 40));
    platforms.push(new Ground(texture, 700, 400, 178, 40));
    platforms.push(new Ground(texture, 900, 400, 178, 40));
    //platforms.push(new Ground(texture, 300, 300, 178, 40));
    platforms.push(new Ground(texture, 500, 400, 178, 40));
    platforms.push(new Ground(texture, 100, 500, 178, 40));
    platforms.forEach(platform =>
    {
        platform.view();
    })
    enemys.forEach(enemy => 
    {
        enemy.view();  
    })
}

