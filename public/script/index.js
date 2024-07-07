const SCENE_WIDTH = 2000
const SCENE_HEIGHT = 1000
const FPS = 60;
const scene = new PIXI.Container();
const platforms = [];
const bullets = [];
const fireballs = [];
const enemies = [];
const app = new PIXI.Application();
const GRAVITY_ACCELERATION = 0.98;
let background;
let hero;
let sceneScale = 1;
const hero_walk = [];
const experiences = [];
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
function resizeWindow()
{
    let relationshipWidth =  window.innerWidth / SCENE_WIDTH;
    let relationshipHeight = window.innerHeight / SCENE_HEIGHT;
    if (relationshipWidth > 1 || relationshipHeight > 1) {
        if (relationshipWidth > relationshipHeight) {
            sceneScale = relationshipWidth;
        } else
        {
            sceneScale = relationshipHeight;
        }
        scene.scale.x = sceneScale;
        scene.scale.y = sceneScale;
    } else
    {
        sceneScale = 1;
    }
    app.renderer.resize(window.innerWidth, window.innerHeight);
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
    await app.init({ background: '#000000',  width: window.innerWidth, height: window.innerHeight});
    document.body.appendChild(app.canvas);
    resizeWindow()
    await PIXI.Assets.load([
        { alias: 'background', src: '/images/level1-map.jpg' },
        { alias: 'hero_walk_group', src: '/images/hero_walk_group.json' },
        { alias: 'hero_idle_group', src: '/images/hero_idle_group.json' },
        { alias: 'hero_jump_group', src: '/images/hero_jump_group.json' },
        { alias: 'hero_dead_group', src: '/images/hero_dead_group.json' },
        { alias: 'enemy', src: '/images/green_cap_enemy.json' },
        { alias: 'experience', src: '/images/experience.svg' },
        { alias: 'ground', src: '/images/ground.svg' },
        { alias: 'bullet', src: '/images/bullet.png' },
        { alias: 'fireball', src: '/images/fireball.svg' },
    ])
    for (let i = 0; i < 10; i++)
    {
        hero_idle.push(PIXI.Texture.from(`hero_idle${1 + i}.png`));
    }
    for (let i = 0; i < 8; i++)
    {
        hero_walk.push(PIXI.Texture.from(`hero_walk${1 + i}.png`));
    }
    for (let i = 0; i < 10; i++)
    {
        hero_jump.push(PIXI.Texture.from(`hero_jump${1 + i}.png`));
    }
    for (let i = 9; i < 10; i++)
    {
        hero_dead.push(PIXI.Texture.from(`hero_dead${1 + i}.png`));
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
    scene.addChild(background);

    app.canvas.addEventListener('mousedown', onAppMouseDown);
    app.canvas.addEventListener('mousemove', onAppMouseMove);
    app.canvas.addEventListener('mouseup', onAppMouseUp);
    window.addEventListener('resize', () => { resizeWindow() });
    levelCreate();
    app.stage.addChild(scene);
    hero = new Hero(400, 100, 6, 0);
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
        while (i < enemies.length)
        {
            if (enemies[i].deadTime > 0)
            {
                enemies[i].update(time);
            }
            else
            {
                enemies[i].dropExperience();
                enemies[i].deleteView();
                enemies[i].sprite.destroy();
                enemies.splice(i, 1);
                i--;
                if (enemies.length === 0)  // проверка победы, если все убиты
                {
                    window.location.href = "/win";
                }
            }
            i++;
        }
        i = 0;
        while (i < experiences.length)
        {
            if (!experiences[i].isTaken)
            {
                experiences[i].update(time);
            }
            else
            {
                experiences[i].deleteView();
                experiences[i].sprite.destroy();
                experiences.splice(i, 1);
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
    else if (scene.x - x < app.screen.width - SCENE_WIDTH * sceneScale)
    {
        moveX = (scene.x + SCENE_WIDTH * sceneScale - app.screen.width);
        scene.x -= moveX;
    }
    else
    {
        scene.x -= moveX;
    }
    if (scene.y - y > 0)
    {
        moveY = scene.y;
        scene.y -= moveY;
    } else if (scene.y - y < app.screen.height - SCENE_HEIGHT * sceneScale)
    {
        moveY = (scene.y + SCENE_HEIGHT * sceneScale - app.screen.height);
        scene.y -= moveY;
    } else
    {
        scene.y -= moveY;
    }
}

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function levelCreate()
{
    let texture //= PIXI.Texture.from('ground');
    platforms.push(new Ground(texture, 1000, 970, 2000, 40)); // пол - 0 уровень
    platforms.push(new Ground(texture, 1790, 820, 420, 40)); // 1 уровень
    platforms.push(new Ground(texture, 750, 750, 1500, 40)); // 2 уровень
    platforms.push(new Ground(texture, 1150, 570, 1700, 40)); // 3 уровень
    platforms.push(new Ground(texture, 1320, 400, 1360, 40)); // 4 уровень
    platforms.push(new Ground(texture, 330, 310, 380, 40)); // 5 уровень

    enemies.push(new Enemy(1600, 350, 300, 0, 300, 50));// 4 уровень
    enemies.push(new Enemy(1200, 350, 300, 0, 300, 50));// 4 уровень

    enemies.push(new Enemy(1600, 520, 300, 0, 300, 50));// 3 уровень
    enemies.push(new Enemy(1200, 520, 300, 0, 300, 50));// 3 уровень

    enemies.push(new Enemy(350, 700, 300, 0, 300, 50));// 2 уровень
    enemies.push(new Enemy(1300, 700, 150, 0, 300, 50));// 2 уровень

    platforms.forEach(platform =>
    {
        platform.view();
    })
    enemies.forEach(enemy =>
    {
        enemy.view();
    });
}

