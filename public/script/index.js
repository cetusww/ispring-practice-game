const app = new PIXI.Application();
const GRAVITY_ACCELERATION = 0.98;
const FPS = 60;
const scene = new PIXI.Container();

let background;
let hero;
let portal;
let sceneScale = 1;

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

function startMusic() {
    audio.load();
    audio.play();
    music = true;
}

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
    if (music === false) {
        startMusic();
    }
}
function onAppMouseUp(event) {
    if (event.button === 0) {
        mouse.isDownLeft = false;
    }
}

function doubleClickremoveState() {
    doubleKeyDown.keyClickCount = 0;
    doubleKeyDown.keyTime = 0;
}

function onKeyDown(event) {
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф') {
        keys.keyLeft = true;
        keys.keyRight = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В') {
        keys.keyRight = true;
        keys.keyLeft = false;
    }
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц') {
        keys.keyUp = true;
        keys.keyDown = false;
    }
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
        keys.keyDown = true;
        keys.keyUp = false;
    }
    if (event.key === 'r' || event.key === 'к') {
        keys.keyR = true;
    }
    if (music === false) {
        startMusic();
    }
}
function onKeyUp(event) {
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф') {
        keys.keyLeft = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В') {
        keys.keyRight = false;
    }
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
        keys.keyDown = false;
        if (new Date() - doubleKeyDown.keyTime < 200 || doubleKeyDown.keyTime === 0) {
            doubleKeyDown.keyTime = new Date();
            doubleKeyDown.keyClickCount += 1;
        } else {
            doubleClickremoveState();
        }
        console.log(doubleKeyDown)
        if (doubleKeyDown.keyClickCount === 2) {
            doubleClickremoveState();
            keys.keyDownDouble = true;
        }
    }
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц') {
        keys.keyUp = false;
    }
}

(async () => {
    await app.init({ background: '#000000', width: window.innerWidth, height: window.innerHeight });
    document.body.appendChild(app.canvas);
    resizeWindow()
    app.canvas.addEventListener('mousedown', onAppMouseDown);
    app.canvas.addEventListener('mousemove', onAppMouseMove);
    app.canvas.addEventListener('mouseup', onAppMouseUp);
    await PIXI.Assets.load(textureSources)
    loadTextures();
    app.stage.addChild(scene);
    levelCreate();
    levelView();
    app.ticker.maxFPS = FPS;
    app.ticker.add((time) => {
        gameLoop(time);
    });
})();


function gameLoop(time) {
    portal.update(time);
    hero.update(time);
    if (hero.experience >= hero.experienceMax * 0.85 && !portal.isActive && !hero.isWin) {
        portal.activate();
        hero.portalTextView();
    }
    if (hero.deadTime < 0) {
        saveScore(hero.isWin);
        hero.deadTime = 1000;
        window.location.href = "/lose";
    }
    if (hero.isWin && portal.isActive) {
        saveScore(hero.isWin);
        window.location.href = "/win";
        portal.isActive = false;
    }
    if (mouse.isDownLeft) {
        hero.createBullet(mouse.positionX, mouse.positionY);
    }
    let i = 0;
    while (i < enemies.length) {
        if (enemies[i].deadTime > 0) {
            enemies[i].update(time);
        }
        else {
            enemies[i].dropExperience();
            enemies[i].deleteView();
            enemies[i].sprite.destroy();
            enemies.splice(i, 1);
            i--;
        }
        i++;
    }
    i = 0;
    while (i < poisons.length) {
        if (poisons[i].lifeTime > 0) {
            poisons[i].update(time);
        }
        else {
            poisons[i].sprite.destroy();
            poisons.splice(i, 1);
            i--;
        }
        i++;
    }
    i = 0;
    while (i < experiences.length) {
        if (!experiences[i].isTaken) {
            experiences[i].update(time);
        }
        else {
            experiences[i].deleteView();
            experiences[i].sprite.destroy();
            experiences.splice(i, 1);
            i--;
        }
        i++;
    }
    i = 0;
    while (i < bullets.length) {
        if (bullets[i].lifeTime > 0) {
            bullets[i].update(time);
        }
        else {
            bullets[i].sprite.destroy();
            bullets.splice(i, 1);
            i--;
        }
        i++;
    }
    i = 0;
    while (i < smokes.length) {
        if (smokes[i].lifeTime > 0) {
            smokes[i].update(time);
        }
        else {
            smokes[i].sprite.destroy();
            smokes.splice(i, 1);
            i--;
        }
        i++;
    }
    i = 0;
    while (i < fireballs.length) {
        if (fireballs[i].lifeTime > 0) {
            fireballs[i].update(time);
        }
        else {
            fireballs[i].sprite.destroy();
            fireballs.splice(i, 1);
            i--;
        }
        i++;
    }
    i = 0;
    while (i < shots.length) {
        if (shots[i].lifeTime > 0) {
            shots[i].update(time);
        }
        else {
            shots[i].sprite.destroy();
            shots.splice(i, 1);
            i--;
        }
        i++;
    }
    for (let i = 0; i < fires.length; i++) {
        fires[i].update();
    }
    i = 0;
    while (i < arrayOfBonus.length) {
        if (!arrayOfBonus[i].isTaken) {
            arrayOfBonus[i].update(time);
        }
        else {
            arrayOfBonus[i].deleteView();
            arrayOfBonus[i].sprite.destroy();
            arrayOfBonus.splice(i, 1);
            i--;
        }
        i++;
    }
    arrayOfStalactite.forEach(stalactite => {
        stalactite.update(time);
    });
    keys.keyDownDouble = false;
    if (new Date() - doubleKeyDown.keyTime > 200) {
        doubleClickremoveState();
    }
}

function moveCamera(x, y) {
    let moveX = x;
    let moveY = y;
    if (scene.x - x > 0) {
        moveX = scene.x;
        scene.x -= moveX;
    }
    else if (scene.x - x < app.screen.width - SCENE_WIDTH * sceneScale) {
        moveX = (scene.x + SCENE_WIDTH * sceneScale - app.screen.width);
        scene.x -= moveX;
    }
    else {
        scene.x -= moveX;
    }
    if (scene.y - y > 0) {
        moveY = scene.y;
        scene.y -= moveY;
    } else if (scene.y - y < app.screen.height - SCENE_HEIGHT * sceneScale) {
        moveY = (scene.y + SCENE_HEIGHT * sceneScale - app.screen.height);
        scene.y -= moveY;
    } else {
        scene.y -= moveY;
    }
}

window.addEventListener('resize', () => { resizeWindow() });
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);