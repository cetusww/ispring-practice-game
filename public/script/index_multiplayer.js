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

const conn = new WebSocket('ws://127.0.0.1:8080');

conn.onopen = function(e) {
    console.log("Connection established!");
    conn.send("Hello Server!");
};

conn.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log(data);
    onButtonDown(data);
    onButtonUp(data);
    if (data.x !== undefined) {
        mouse.positionX = data.x * SCENE_WIDTH;
        mouse.positionY = data.y * SCENE_HEIGHT; // Fixed the height multiplier
    }
};

const keys = {
    keyDown: false,
    keyUp: false,
    keyLeft: false,
    keyRight: false,
};

let mouse = {
    isDownLeft: false,
    positionX: 0,
    positionY: 0,
};

function onAppMouseDown(event) {
    if (event.button === 0) {
        mouse.isDownLeft = true;
    }
}

function onAppMouseMove(event) {
    if (event.button === 0) {
        mouse.positionX = event.clientX;
        mouse.positionY = event.clientY;
    }
}

function onAppMouseUp(event) {
    if (event.button === 0) {
        mouse.isDownLeft = false;
    }
}

function onKeyDown(event) {
    if (event.keyCode === 37) {
        keys.keyLeft = true;
        keys.keyRight = false;
    }
    if (event.keyCode === 39) {
        keys.keyRight = true;
        keys.keyLeft = false;
    }
    if (event.keyCode === 38) {
        keys.keyUp = true;
        keys.keyDown = false;
    }
    if (event.keyCode === 40) {
        keys.keyDown = true;
        keys.keyUp = false;
    }
}

function onKeyUp(event) {
    if (event.keyCode === 37) keys.keyLeft = false;
    if (event.keyCode === 39) keys.keyRight = false;
    if (event.keyCode === 40) keys.keyDown = false;
    if (event.keyCode === 38) keys.keyUp = false;
}

function onButtonDown(data) {
    if (data === 'left') {
        keys.keyLeft = true;
        keys.keyRight = false;
    }
    if (data === 'right') {
        keys.keyRight = true;
        keys.keyLeft = false;
    }
    if (data === 'up') {
        keys.keyUp = true;
        keys.keyDown = false;
    }
    if (data === 'down') {
        keys.keyDown = true;
        keys.keyUp = false;
    }
    if (data === 'fire') {
        mouse.isDownLeft = true;
    }
}

function onButtonUp(data) {
    if (data === '-left') keys.keyLeft = false;
    if (data === '-right') keys.keyRight = false;
    if (data === '-up') keys.keyUp = false;
    if (data === '-down') keys.keyDown = false;
    if (data === '-fire') mouse.isDownLeft = false;
}

(async () => {
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);
    await PIXI.Assets.load([
        { alias: 'hero_idle_group', src: '/images/hero_idle_group.json' },
        { alias: 'hero_walk_group', src: '/images/hero_walk_group.json' },
        { alias: 'hero_jump_group', src: '/images/hero_jump_group.json' },
        { alias: 'hero_shoot_group', src: '/images/hero_shoot_group.json' },
        { alias: 'hero_walk_shoot_group', src: '/images/hero_walk_shoot_group.json' },
        { alias: 'hero_dead_group', src: '/images/hero_dead_group.json' },
        { alias: 'ground', src: '/images/ground.svg' },
        { alias: 'bullet', src: '/images/bullet.png' },
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
        hero_shoot.push(PIXI.Texture.from(`hero_shoot${1 + i}.png`));
    }
    for (let i = 0; i < 9; i++)
    {
        hero_walk_shoot.push(PIXI.Texture.from(`hero_walk_shoot${1 + i}.png`));
    }

    app.canvas.addEventListener('mousedown', onAppMouseDown);
    app.canvas.addEventListener('mousemove', onAppMouseMove);
    app.canvas.addEventListener('mouseup', onAppMouseUp);

    levelCreate();
    app.stage.addChild(scene);

    const hero1 = new Hero('hero', app.screen.width / 2 - 200, app.screen.height / 2, 7, 0);
    const hero2 = new Hero('hero', app.screen.width / 2 + 200, app.screen.height / 2, 7, 0); // Second hero

    hero1.view();
    hero2.view(); // Render second hero

    app.ticker.add((time) => {
        hero1.update(time);
        hero2.update(time); // Update second hero

        if (mouse.isDownLeft) {
            hero1.createBullet(mouse.positionX, mouse.positionY);
            hero2.createBullet(mouse.positionX, mouse.positionY); // Second hero fires bullets
        }

        let i = 0;
        while (i < bullets.length) {
            if (bullets[i].lifeTime > 0) {
                bullets[i].update(time);
            } else {
                bullets[i].sprite.destroy();
                bullets.splice(i, 1);
            }
            i++;
        }
    });
})();

function moveCamera(x, y) {
    let moveX = x;
    let moveY = y;
    if (scene.x - x > 0) {
        moveX = scene.x;
        scene.x -= moveX;
    } else if (scene.x - x < app.screen.width - SCENE_WIDTH) {
        moveX = (scene.x + SCENE_WIDTH - app.screen.width);
        scene.x -= moveX;
    } else {
        scene.x -= moveX;
    }
    scene.y += y;
}

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function levelCreate() {
    let texture = PIXI.Texture.from('ground');
    platforms.push(new Ground(texture, 89, 250, 178, 40));
    platforms.push(new Ground(texture, app.screen.width / 2, app.screen.height / 2 + 80, 178, 40));
    platforms.push(new Ground(texture, app.screen.width / 2, app.screen.height / 2 - 80, 178, 40));
    platforms.push(new Ground(texture, app.screen.width / 2 + 200, app.screen.height / 2 + 70, 178, 40));
    platforms.push(new Ground(texture, app.screen.width / 2 - 200, app.screen.height / 2 + 70, 178, 40));
    platforms.forEach(platform => {
        platform.view();
    });
}