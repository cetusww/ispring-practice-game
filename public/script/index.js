const FPS = 60;
const scene = new PIXI.Container();
const platforms = [];
const arrayOfWall = [];
const arrayOfBonus = [];
const woodenPlanks = [];
const arrayOfStalactite = [];
const bullets = [];
const fireballs = [];
const enemies = [];
const poisons = [];
const fires = [];
const smokes = [];
const shots = [];

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
const fire_anim = [];
const mushroom_idle = [];
const mushroom_active = [];
const smoke_anim = [];
const boss_idle = [];
const boss_walk = [];
const boss_dead = [];

const startTime = new Date().getTime();

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
    resizeWindow();
    await PIXI.Assets.load([
        { alias: 'level1_map', src: '/images/Map/first_level_map.jpg' },
        { alias: 'level2_map', src: '/images/Map/level2_map.png' },
        { alias: 'level3_map', src: '/images/Map/level3_map.png' },
        { alias: 'hero_idle_group', src: '/images/Hero/hero_idle_group.json' },
        { alias: 'hero_walk_group', src: '/images/Hero/hero_walk_group.json' },
        { alias: 'hero_jump_group', src: '/images/Hero/hero_jump_group.json' },
        { alias: 'hero_shoot_group', src: '/images/Hero/hero_shoot_group.json' },
        { alias: 'hero_walk_shoot_group', src: '/images/Hero/hero_walk_shoot_group.json' },
        { alias: 'hero_dead_group', src: '/images/Hero/hero_dead_group.json' },
        { alias: 'experience', src: '/images/Object/experience.svg' },
        { alias: 'ground', src: '/images/Object/ground.svg' },
        { alias: 'bullet', src: '/images/Object/bullet.png' },
        { alias: 'fireball', src: '/images/Object/fireball.svg' },
        { alias: 'stalactite', src: '/images/Object/stalactite.png' },
        { alias: 'bat', src: '/images/Enemy/bat_group.json' },
        { alias: 'poison', src: '/images/Object/poison.png' },
        { alias: 'devil', src: '/images/Enemy/devil.json' },
        { alias: 'fire', src: '/images/Object/fire.json' },
        { alias: 'mushroom', src: '/images/Enemy/mushroom.json' },
        { alias: 'smoke', src: '/images/Object/smoke.json' },
        { alias: 'shield', src: '/images/Object/shield.png' },
        { alias: 'health', src: '/images/Object/health.png' },
        { alias: 'portal', src: '/images/Object/portal.png' },
        { alias: 'non_active_portal', src: '/images/Object/non_active_portal.png' },
        { alias: 'boss', src: '/images/Enemy/boss.json' },
        { alias: 'shot', src: '/images/Object/shot.png' },
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
    for (let i = 0; i < 50; i++)
    {
        fire_anim.push(PIXI.Texture.from(`fire${1 + i}.png`));
    }
    for (let i = 0; i < 14; i++)
    {
        mushroom_idle.push(PIXI.Texture.from(`mushroomIdle${1 + i}.png`));
    }
    for (let i = 0; i < 8; i++)
    {
        mushroom_active.push(PIXI.Texture.from(`mushroomActive${1 + i}.png`));
    }
    for (let i = 0; i < 13; i++)
    {
        smoke_anim.push(PIXI.Texture.from(`smoke${1 + i}.png`));
    }
    for (let i = 0; i < 4; i++)
    {
        boss_idle.push(PIXI.Texture.from(`bossIdle${1 + i}.png`));
    }
    for (let i = 0; i < 8; i++)
    {
        boss_walk.push(PIXI.Texture.from(`bossWalk${1 + i}.png`));
    }
    for (let i = 0; i < 8; i++)
    {
        boss_dead.push(PIXI.Texture.from(`bossDead${1 + i}.png`));
    }

    app.canvas.addEventListener('mousedown', onAppMouseDown);
    app.canvas.addEventListener('mousemove', onAppMouseMove);
    app.canvas.addEventListener('mouseup', onAppMouseUp);
    window.addEventListener('resize', () => { resizeWindow() });
    app.stage.addChild(scene);
    levelCreate();
    levelView();
    app.ticker.maxFPS = FPS;
    app.ticker.add((time) =>
    {
        gameLoop(time);
    });
})();


async function gameLoop(time)
{
    portal.update(time);
    hero.update(time);
    if (hero.experience >= hero.experienceMax * 0.85 && !portal.isActive && !hero.isWin)
    {
        portal.activate();
        hero.portalTextView();
    }
    if (hero.deadTime < 0)
    {
        hero.deadTime = 1000;
        window.location.href = "/lose";
    }
    if (hero.isWin && portal.isActive) {
        await saveScore();
        window.location.href = "/win";
        portal.isActive = false;
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
    while (i < smokes.length)
    {
        if (smokes[i].lifeTime > 0)
        {
            smokes[i].update(time);
        }
        else
        {
            smokes[i].sprite.destroy();
            smokes.splice(i, 1);
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
    while (i < shots.length)
    {
        if (shots[i].lifeTime > 0)
        {
            shots[i].update(time);
        }
        else
        {
            shots[i].sprite.destroy();
            shots.splice(i, 1);
            i--;
        }
        i++;
    }
    for (let i = 0; i < fires.length; i++)
    {
        fires[i].update();
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
    arrayOfStalactite.forEach(stalactite =>
    {
        stalactite.update(time);
    });
    keys.keyDownDouble = false;
    if (new Date() - doubleKeyDown.keyTime > 200) {
        doubleClickremoveState();
    }
}
function levelView()
{
    portal.view();
    arrayOfWall.forEach(wall => {
        wall.view();
    })
    woodenPlanks.forEach(woodenPlank =>
    {
        woodenPlank.view();
    })

    platforms.forEach(platform =>
    {
        platform.view();
    })
    let experienceMax = 0;
    enemies.forEach(enemy =>
    {
        enemy.view();
        experienceMax += enemy.experience;
    });
    arrayOfBonus.forEach(bonus =>
    {
        bonus.view();
    });
    arrayOfStalactite.forEach(stalactite =>
    {
        stalactite.view();
    });
    fires.forEach(fire =>
    {
        fire.view();
    });
    
    hero.experienceMax = experienceMax;
    hero.view();
}


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