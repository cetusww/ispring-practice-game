const SCENE_WIDTH = 3000;
const SCENE_HEIGHT = 1250;
const FPS = 60;
const scene = new PIXI.Container();
const platforms = [];
const arrayOfWall = [];
const woodenPlanks = [];
const bullets = [];
const fireballs = [];
const enemies = [];
const poisons = [];
const fires = [];
const smokes = [];

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
        { alias: 'background', src: '/images/level2_map.png' },
        { alias: 'sound_on', src: '/images/sound_on.png'},
        { alias: 'sound_off', src: '/images/sound_off.png'},
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
        { alias: 'fire', src: '/images/fire.json' },
        { alias: 'mushroom', src: '/images/mushroom.json' },
        { alias: 'smoke', src: '/images/smoke.json' },
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
    hero = new Hero(2700, 100, 6, 0, 680);
    hero.view();
    app.ticker.maxFPS = FPS;
    app.ticker.add((time) =>
    {
        hero.update(time);
        if (hero.deadTime < 0)
        {
            window.location.href = "/lose";
        }
        // if (hero.sprite.x > app.screen.width)  // проверка на победу по достижении точки
        // {
        //     window.location.href = "/win";
        // }
        // if (hero.sprite.x < 0)
        // {
        //     window.location.href = "/lose";
        // }
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
        for (let i = 0; i < fires.length; i++)
        {
            fires[i].update();
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
    platforms.push(new Ground(texture, 1500, 70, 3000, 40)); // потолок - 4 уровень
    platforms.push(new Ground(texture, 345, 255, 690, 40)); // 3 уровень
    woodenPlanks.push(new WoodenPlank(texture, 745, 255, 110, 40));// 3 уровень

    platforms.push(new Ground(texture, 345, 550, 690, 40)); // 2 уровень
    platforms.push(new Ground(texture, 1355, 550, 1110, 40)); // 2 уровень
    platforms.push(new Ground(texture, 2270, 550, 520, 40)); // 2 уровень
    platforms.push(new Ground(texture, 2850, 550, 300, 40)); // 2 уровень
    woodenPlanks.push(new WoodenPlank(texture, 745, 550, 110, 40));// 2 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1958, 550, 100, 40));// 2 уровень


    platforms.push(new Ground(texture, 345, 845, 690, 40)); // 1 уровень
    platforms.push(new Ground(texture, 1085, 845, 570, 40)); // 1 уровень
    platforms.push(new Ground(texture, 1870, 845, 800, 40)); // 1 уровень
    platforms.push(new Ground(texture, 2685, 845, 630, 40)); // 1 уровень
    woodenPlanks.push(new WoodenPlank(texture, 745, 845, 110, 40));// 1 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1420, 845, 100, 40));// 1 уровень
    woodenPlanks.push(new WoodenPlank(texture, 2320, 845, 100, 40));// 1 уровень

    platforms.push(new Ground(texture, 1500, 1155, 3000, 40)); // пол - 0 уровень

    arrayOfWall.push(new Wall(texture, 1262, 410, 64, 820));
    arrayOfWall.push(new Wall(texture, 1635, 1010, 64, 320));
    arrayOfWall.push(new Wall(texture, 2500, 265, 64, 530));
    arrayOfWall.push(new Wall(texture, 1828, 450, 68, 160)); // высокая тумба
    arrayOfWall.push(new Wall(texture, 2645, 790, 68, 60)); // низкая тумба
    arrayOfWall.push(new Wall(texture, 10, 150, 64, 150)); // левая стена
    arrayOfWall.push(new Wall(texture, 78, 730, 128, 1050)); // левая стена
    arrayOfWall.push(new Wall(texture, 2950, 625, 128, 1250)); // правая стена
    
    
    enemies.push(new Bat(300, 350, 200, 200, 400, 400));// bat test
    fires.push(new Fire(1000, 500));// fire test

    enemies.push(new Mushroom(1000, 350, 250, 220));// mushroom test

    enemies.push(new Devil(1600, 500, 300, 0, 300, 50));// 2 уровень
    enemies.push(new Devil(1200, 500, 300, 0, 300, 50));// 2 уровень

    enemies.push(new Devil(1600, 795, 300, 0, 300, 50));// 1 уровень
    enemies.push(new Devil(1200, 795, 300, 0, 300, 50));// 1 уровень

    enemies.push(new Devil(350, 1105, 300, 0, 300, 50));// 0 уровень
    enemies.push(new Devil(1300, 1105, 150, 0, 300, 50));// 0 уровень
    arrayOfWall.forEach(wall => {
        wall.view();
    })
    woodenPlanks.forEach(woodenPlank => {
        woodenPlank.view();
    }
    )
    
    enemies.push(new Bat(300, 350, 200, 200, 400, 400));// bat test

    platforms.forEach(platform =>
    {
        platform.view();
    });
    enemies.forEach(enemy =>
    {
        enemy.view();
    });

    fires.forEach(fire =>
    {
        fire.view();
    });

}

function addBackground(app) {
    const background = PIXI.Sprite.from('background');
    background.anchor.set(0);


    function resizeBackground() {
        background.width = app.screen.width;
        background.height = app.screen.height;
    }

    resizeBackground();
    app.stage.addChild(background);

    window.addEventListener('resize', () => {S
        app.renderer.resize(window.innerWidth, window.innerHeight);
        resizeBackground();
    });
}

