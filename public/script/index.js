//import { Application } from 'pixi.js';
// let Application			= PIXI.Application

//import { Application } from "/pixi.js";

// Asynchronous IIFE
const SCENE_WIDTH = window.innerWidth
const SCENE_HEIGHT = window.innerHeight

var scene = new PIXI.Container();
var objects = []
var app = new PIXI.Application();
(async () =>
{
    // Create a PixiJS application.
    

    // Intialize the application.
    await app.init({ background: '#1099bb',  resizeTo: window });//

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    //var bulletTexture = await PIXI.Assets.load('/images/bullet.svg')
    let heroTexture = await PIXI.Assets.load('/images/hero.svg');
    let bulletTexture = await PIXI.Assets.load('/images/bullet.svg');
    const hero = new Hero('/images/hero.svg',app.screen.width / 2, app.screen.height / 2, 7, 0)


    texture = await PIXI.Assets.load('/images/ground.svg')
    ground = new Ground(texture, 89, 280, 178, 40)
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
    


    // Функция для обновления камеры (перемещение и масштабирование)
    function updateScene(x, y, scale) {
        scene.x = -x * scale// + app.renderer.width / 2;
        scene.y = -y * scale// + app.renderer.height / 2;
        scene.scale.set(scale);
    }
    
    // Обновляем камеру с новыми координатами и масштабом

    hero.view()
    app.ticker.add((time) => {
      hero.update(time)
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
    //console.log(scene.x)
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
