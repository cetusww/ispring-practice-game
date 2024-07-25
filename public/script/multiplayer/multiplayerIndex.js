const app = new PIXI.Application();
const GRAVITY_ACCELERATION = 0.98;
const FPS = 60;
const scene = new PIXI.Container();

let background;
let state =
{
    'state': 'stop',
    'time': 0,
};
let hero;
let heroView;
let opponentDamage = 0;
let arrayOfOpponent = [heroView];
let sceneScale = 1;

let musicButton;
let musicText;

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

const removeBullets = [];
const opponentBullets = [];

let removeBonusId = [];

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
audio.load();
audio.volume = 0.8;
audio.loop = true;

function musicToggle()
{
    if (!music) {
        music = true
        musicButton.texture = PIXI.Texture.from('sound_on')
        audio.play();
    } else {
        music = false
        musicButton.texture = PIXI.Texture.from('sound_off')
        audio.pause();
    }
    console.log(music)
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

    app.canvas.addEventListener('mousedown', onAppMouseDown);
    app.canvas.addEventListener('mousemove', onAppMouseMove);
    app.canvas.addEventListener('mouseup', onAppMouseUp);

    await PIXI.Assets.load(textureSources)
    loadTextures();

    window.addEventListener('resize', () => { resizeWindow() });
    app.stage.addChild(scene);

    levelCreate();

    musicButton = new PIXI.Sprite(PIXI.Texture.from('sound_off'));
    musicButton.x = 450;
    musicButton.y = app.screen.height - 30;
    musicButton.anchor.set(0.5);
    musicButton.cursor = 'pointer';
    musicButton.eventMode = 'static';
    musicButton.width = 40;
    musicButton.height = 40;
    musicButton.on('pointerdown', musicToggle);
    app.stage.addChild(musicButton);

    musicText = new PIXI.Text('Music', { fontFamily: 'Arial', fontSize: 24, fill: 0xfeeb77, });
    musicText.x = 480;
    musicText.y = app.screen.height - 42;
    app.stage.addChild(musicText);

    levelView();
    app.ticker.maxFPS = FPS;
    app.ticker.add((time) => {
        gameLoop(time);
    });
})();

function gameLoop(time) {
    if (state['state'] === 'start') {
        hero.update(time);
        heroView.update(time);
        hero.updateMap();
        arrayOfOpponent = [heroView];
        if (hero.deadTime < 0) {
            hero.deadTime = 1000;
            window.location.href = "/lose";
        }
        if (mouse.isDownLeft) {
            hero.createBullet(mouse.positionX, mouse.positionY);
        }
        let i = 0;
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
                opponentDamage = opponentDamage + bullets[i].updateCollideOpponent(heroView);
            }
            else {
                bullets[i].sprite.destroy();
                bullets.splice(i, 1);
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
                removeBonusId.push(arrayOfBonus[i].id);
                arrayOfBonus.splice(i, 1);
                i--;
            }
            i++;
        }
        arrayOfStalactite.forEach(stalactite => {
            stalactite.update(time);
        });
    }
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