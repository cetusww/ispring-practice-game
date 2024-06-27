//import { Application } from 'pixi.js';
// let Application			= PIXI.Application

//import { Application } from "/pixi.js";

// Asynchronous IIFE
const SCENE_WIDTH = window.innerWidth
const SCENE_HEIGHT = window.innerHeight

const scene = new PIXI.Container();
const objects = []
const bullets = []
const app = new PIXI.Application();
(async () =>
{
    // Intialize the application.
    await app.init({ background: '#1099bb',  resizeTo: window });//

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    await PIXI.Assets.load([
        '/images/hero.svg',
        '/images/bullet.svg',
        '/images/ground.svg',
    ])

    const hero = new Hero('/images/hero.svg',app.screen.width / 2, app.screen.height / 2, 7, 0)
    let mouse = {
        isDownLeft: false,
        positionX: 0,
        positionY: 0,
    }
    function onAppMouseDown(event) {
        if (event.button === 0) {
            mouse.isDownLeft = true
            //hero.createBullet(event.clientX, event.clientY)
        }
    }
    function onAppMouseMove(event) {
        if (event.button === 0) {
            mouse.positionX = event.clientX
            mouse.positionY = event.clientY
            //hero.createBullet(event.clientX, event.clientY)
        }
    }
    function onAppMouseUp(event) {
        if (event.button === 0) {
            mouse.isDownLeft = false
            //hero.createBullet(event.clientX, event.clientY)
        }
    }
    app.canvas.addEventListener('mousedown', onAppMouseDown)
    app.canvas.addEventListener('mousemove', onAppMouseMove)
    app.canvas.addEventListener('mouseup', onAppMouseUp)

    let texture = PIXI.Texture.from('/images/ground.svg')
    let ground = new Ground(texture, 89, 280, 178, 40)
    objects.push(ground)
    ground.view()
    ground = new Ground(texture, 370, 370, 178, 40)
    ground.view()
    ground = new Ground(texture, 600, 370, 178, 40)
    ground.view()
    ground = new Ground(texture, 900, 370, 178, 40)
    ground.view()
    ground = new Ground(texture, 1200, 370, 178, 40)
    ground.view()
    ground = new Ground(texture, 1500, 370, 178, 40)
    ground.view()
    ground = new Ground(texture, 2411, 370, 178, 40)
    ground.view()

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
    return {
        x: moveX,
        y: moveY
    }
}

function intersects(object1, object2)
{
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return (
        bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y
    );
}

function keyboard(keyCode) {
    const key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    key.downHandler = (event) => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
  
    key.upHandler = (event) => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
  
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}
