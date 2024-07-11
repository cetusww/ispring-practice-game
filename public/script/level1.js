const SCENE_WIDTH = 2560
const SCENE_HEIGHT = 1460
const FPS = 60;
const scene = new PIXI.Container();
const platforms = [];
const woodenPlanks = [];
const bullets = [];
const arrayOfWall = [];
const arrayOfBonus = [];
const fireballs = [];
const enemies = [];
const poisons = [];

const app = new PIXI.Application();
const GRAVITY_ACCELERATION = 0.98;
let background;
let hero;
let portal;
let sceneScale = 1;
const hero_walk = [];
const experiences = [];
const hero_jump = [];
const hero_idle = [];
const hero_dead = [];
const devilWalk = [];
const devilIdle = [];
const batFlyHorizontal = [];
const batFlyVertical = [];
const hero_shoot = [];
const hero_walk_shoot = [];

const keys =
{
    keyDown: false,
    keyUp: false,
    keyLeft: false,
    keyRight: false,
    keyR: false,
    keyDownDouble: false,
}
const doubleKeyDown =
{
    keyTime: 0,
    keyClickCount: 0,
}
const mouse =
{
    isDownLeft: false,
    positionX: 0,
    positionY: 0,
}

let audio = new Audio('/sounds/music.mp3');
let music = false;
audio.volume = 1;
audio.loop = true;

function startMusic()
{
    audio.load();
    audio.play();
    music = true;
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
    if (music === false)
    {
        startMusic();
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

function doubleClickremoveState()
{
    doubleKeyDown.keyClickCount = 0;
    doubleKeyDown.keyTime = 0;
}

function onKeyDown(event)
{
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф')
    {
        keys.keyLeft = true;
        keys.keyRight = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В')
    {
        keys.keyRight = true;
        keys.keyLeft = false;
    }
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц')
    {
        keys.keyUp = true;
        keys.keyDown = false;
    }
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы')
    {
        keys.keyDown = true;
        keys.keyUp = false;
    }
    if (event.key === 'r' || event.key === 'к')
    {
        keys.keyR = true;
    }
    if (music === false)
    {
        startMusic();
    }
}
function onKeyUp(event)
{
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф')
    {
        keys.keyLeft = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В')
    {
        keys.keyRight = false;
    }
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы')
    {
        keys.keyDown = false;
        if (new Date() - doubleKeyDown.keyTime < 200 || doubleKeyDown.keyTime === 0)
        {
            doubleKeyDown.keyTime = new Date();
            doubleKeyDown.keyClickCount += 1;
        } else
        {
            doubleClickremoveState();
        }
        console.log(doubleKeyDown)
        if (doubleKeyDown.keyClickCount === 2)
        {
            doubleClickremoveState();
            keys.keyDownDouble = true;
        }
    }
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц')
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
        { alias: 'background', src: '/images/first_level_map.jpg' },
        { alias: 'hero_idle_group', src: '/images/hero_idle_group.json' },
        { alias: 'hero_walk_group', src: '/images/hero_walk_group.json' },
        { alias: 'hero_jump_group', src: '/images/hero_jump_group.json' },
        { alias: 'hero_shoot_group', src: '/images/hero_shoot_group.json' },
        { alias: 'hero_walk_shoot_group', src: '/images/hero_walk_shoot_group.json' },
        { alias: 'hero_dead_group', src: '/images/hero_dead_group.json' },
        { alias: 'experience', src: '/images/experience.svg' },
        { alias: 'ground', src: '/images/ground.svg' },
        { alias: 'bullet', src: '/images/bullet.png' },
        { alias: 'fireball', src: '/images/fireball.svg' },
        { alias: 'bat', src: '/images/bat_group.json' },
        { alias: 'poison', src: '/images/poison.png' },
        { alias: 'devil', src: '/images/devil.json' },
        { alias: 'shield', src: '/images/shield.png' },
        { alias: 'health', src: '/images/health.png' },
        { alias: 'portal', src: '/images/portal.png' },
        { alias: 'non_active_portal', src: '/images/non_active_portal.png' },
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
    for (let i = 0; i < 4; i++)
    {
        devilWalk.push(PIXI.Texture.from(`devilWalk${1 + i}.png`));
    }
    devilIdle.push(PIXI.Texture.from(`devilIdle.png`));
    for (let i = 0; i < 4; i++)
    {
        batFlyVertical.push(PIXI.Texture.from(`batFlyVertical${1 + i}.png`));
    }
    for (let i = 0; i < 4; i++)
    {
        batFlyHorizontal.push(PIXI.Texture.from(`batFlyHorizontal${1 + i}.png`));
    }
    for (let i = 0; i < 4; i++)
    {
        hero_shoot.push(PIXI.Texture.from(`hero_shoot${1 + i}.png`));
    }
    for (let i = 0; i < 9; i++)
    {
        hero_walk_shoot.push(PIXI.Texture.from(`hero_walk_shoot${1 + i}.png`));
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
    hero = new Hero(400, 100, 6, 0, 680);
    portal = new Portal(1850, 890);
    portal.view();
    hero.view();
    app.ticker.maxFPS = FPS;
    app.ticker.add((time) =>
    {
        portal.update(time);
        hero.update(time);
        if (hero.experience >= hero.experienceMax * 0.7 && !portal.isActive)
        {
            portal.activate();
            hero.portalTextView();
        }
        if (hero.deadTime < 0)
        {
            saveScore();
            window.location.href = "/lose";
        }
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
                    saveScore();
                    window.location.href = "/win";
                }
            }
            i++;
        }
        i = 0;
        while (i < poisons.length)
            {
                if (poisons[i].lifeTime > 0)
                {
                    poisons[i].update(time);
                }
                else
                {
                    poisons[i].sprite.destroy();
                    poisons.splice(i, 1);
                    i--;
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
        i = 0;
        while (i < arrayOfBonus.length)
        {
            if (!arrayOfBonus[i].isTaken)
            {
                arrayOfBonus[i].update(time);
            }
            else
            {
                arrayOfBonus[i].deleteView();
                arrayOfBonus[i].sprite.destroy();
                arrayOfBonus.splice(i, 1);
                i--;
            }
            i++;
        }
        keys.keyDownDouble = false;
        if (new Date() - doubleKeyDown.keyTime > 200) {
            doubleClickremoveState();
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
//window.addEventListener('keypress', () => {console.log('press')})
//window.addEventListener('dblclick', doubleClick);
function levelCreate()
{
    let texture //= PIXI.Texture.from('ground');
    platforms.push(new Ground(texture, 420, 440, 470, 40)); // 5 уровень

    platforms.push(new Ground(texture, 1243, 580, 605, 40)); // 4 уровень
    platforms.push(new Ground(texture, 2107, 580, 905, 40)); // 4 уровень
    woodenPlanks.push(new WoodenPlank(texture, 885, 580, 110, 40));// 4 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1600, 580, 110, 40));//4 уровень

    platforms.push(new Ground(texture, 77, 820, 154, 40)); // 3 уровень
    platforms.push(new Ground(texture, 857, 820, 1195, 40)); // 3 уровень
    platforms.push(new Ground(texture, 1745, 820, 380, 40)); // 3 уровень
    platforms.push(new Ground(texture, 2305, 820, 510, 40)); // 3 уровень
    woodenPlanks.push(new WoodenPlank(texture, 205, 820, 100, 40));// 3 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1505, 820, 100, 40));// 3 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1990, 820, 110, 40));// 3 уровень

    platforms.push(new Ground(texture, 77, 1080, 154, 40)); // 2 уровень
    platforms.push(new Ground(texture, 465, 1080, 415, 40)); // 2 уровень
    platforms.push(new Ground(texture, 1080, 1080, 600, 40)); // 2 уровень
    platforms.push(new Ground(texture, 1740, 1080, 380, 40)); // 2 уровень
    woodenPlanks.push(new WoodenPlank(texture, 205, 1080, 100, 40));// 2 уровень
    woodenPlanks.push(new WoodenPlank(texture, 725, 1080, 110, 40));// 2 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1465, 1080, 180, 40));// 2 уровень
    platforms.push(new Ground(texture, 2290, 1190, 540, 40)); // 1 уровень
    platforms.push(new Ground(texture, 1280, 1400, 2560, 40)); // пол - 0 уровень

    arrayOfBonus.push(new Shield(450, 880, 100));
    arrayOfBonus.push(new Health(450, 520));
    arrayOfBonus.push(new Shield(350, 520, 100));
    arrayOfBonus.push(new Health(1900, 780)); // 1 уровень


    enemies.push(new Bat(300, 350, 200, 200, 400, 400));// bat test

    enemies.push(new Devil(1600, 530, 300, 0, 300, 50));// 4 уровень
    enemies.push(new Devil(1200, 530, 300, 0, 300, 50));// 4 уровень

    enemies.push(new Devil(1600, 770, 300, 0, 300, 50));// 3 уровень
    enemies.push(new Devil(1200, 770, 300, 0, 300, 50));// 3 уровень

    enemies.push(new Devil(350, 1030, 300, 0, 300, 50));// 2 уровень
    enemies.push(new Devil(1300, 1030, 150, 0, 300, 50));// 2 уровень

    woodenPlanks.forEach(woodenPlank =>
    {
        woodenPlank.view();
    })

    platforms.forEach(platform =>
    {
        platform.view();
    })
    enemies.forEach(enemy =>
    {
        enemy.view();
    });
    arrayOfBonus.forEach(bonus =>
    {
        bonus.view();
    });
}

async function saveScore()
{
    let data = {
        score: hero.experience,
        lvl: 1,
    }
    const stringifyData = JSON.stringify(data)
    const response = await fetch('/api/score', {
         method: "POST",
         body: stringifyData,
         headers: {
             "Content-Type": "application/json",
         },
     });
 }
