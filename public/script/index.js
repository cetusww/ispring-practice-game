const SCENE_WIDTH = window.innerWidth
const SCENE_HEIGHT = window.innerHeight

const scene = new PIXI.Container();
const platforms = []
const bullets = []
const app = new PIXI.Application();

const keys = {
    keyDown: false,
    keyUp: false,
    keyLeft: false,
    keyRight: false,
}
let mouse = {
    isDownLeft: false,
    positionX: 0,
    positionY: 0,
}
function onAppMouseDown(event) {
    if (event.button === 0) {
        mouse.isDownLeft = true
    }
}
function onAppMouseMove(event) {
    if (event.button === 0) {
        mouse.positionX = event.clientX
        mouse.positionY = event.clientY
    }
}
function onAppMouseUp(event) {
    if (event.button === 0) {
        mouse.isDownLeft = false
    }
}

function onKeyDown(event) {
    if (event.keyCode === 37) {
        keys.keyLeft = true
        keys.keyRight = false
    }
    if (event.keyCode === 39) {
        keys.keyRight = true
        keys.keyLeft = false
    }
    if (event.keyCode === 38) {
        keys.keyUp = true
        keys.keyDown = false
    }
    if (event.keyCode === 40) {
        keys.keyDown = true
        keys.keyUp = false
    }
}
function onKeyUp(event) {
    if (event.keyCode === 37) {
        keys.keyLeft = false
    }
    if (event.keyCode === 39) {
        keys.keyRight = false
    }
    if (event.keyCode === 40) {
        keys.keyDown = false
    }
    if (event.keyCode === 38) {
        keys.keyUp = false
    }
}

(async () =>
{
    // Intialize the application.
    await app.init({ background: '#1099bb',  resizeTo: window });//

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    let assets = [
        { alias: 'hero-group', src: '/images/hero-group.json' },
        { alias: 'background', src: '/images/level1-map.jpg' },
        { alias: 'hero', src: '/images/hero.svg' },
        { alias: 'bullet', src: '/images/bullet.svg' },
        { alias: 'ground', src: '/images/ground.svg' },

    ]

    await PIXI.Assets.load(assets);
    addBackground(app);

    const hero = new Hero('/images/hero.svg',app.screen.width / 2, app.screen.height / 2, 7, 0)



    app.canvas.addEventListener('mousedown', onAppMouseDown)
    app.canvas.addEventListener('mousemove', onAppMouseMove)
    app.canvas.addEventListener('mouseup', onAppMouseUp)
    levelCreate()
    
    platforms.forEach(platform => {
        platform.view()
    })

    app.stage.addChild(scene);

    hero.view()
    app.ticker.add((time) => {
        hero.update(time)
        if (mouse.isDownLeft) {
            hero.createBullet(mouse.positionX, mouse.positionY)
        }
        let i = 0

        while (i < bullets.length) {
            if (bullets[i].lifeTime > 0) {
                bullets[i].update(time)
            } else {
                bullets[i].sprite.destroy()
                bullets.splice(i, 1)
            }
            i++
        }
    });
})();

function moveCamera(x, y) {
    let moveX = x
    let moveY = y
    if (scene.x - x > 0) {
        moveX = scene.x
        scene.x -= moveX
    } else if (scene.x - x < app.screen.width - SCENE_WIDTH) {
        moveX = (scene.x + SCENE_WIDTH - app.screen.width)
        scene.x -= moveX
    } else {
        scene.x -= moveX
    }
    scene.y += y
}

window.addEventListener('keydown', onKeyDown)
window.addEventListener('keyup', onKeyUp)

function levelCreate() {
    // let texture = PIXI.Texture.from('/images/ground.svg')
    let texture
    platforms.push(new Ground(texture, app.screen.width / 2 + 350, 320, app.screen.width, 40))
    platforms.push(new Ground(texture, app.screen.width / 2 + 150, 450, app.screen.width, 40))
    platforms.push(new Ground(texture, app.screen.width / 2 - 270, 590, app.screen.width, 40))
    platforms.push(new Ground(texture, app.screen.width / 2, 750, app.screen.width, 40))
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

    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        resizeBackground();
    });
}
