const SCENE_WIDTH = 3000;
const SCENE_HEIGHT = 1250;
function levelCreate()
{
    background = PIXI.Sprite.from('level2_map');
    background.anchor.set(0);

    function resizeBackground()
    {
        background.width = SCENE_WIDTH;
        background.height = SCENE_HEIGHT;
    }
    scene.addChild(background);
    resizeBackground();
    hero = new Hero(2700, 100, 6, 0, 680);
    hero.view();

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

    enemies.push(new Devil(1600, 500, 300, 0, 300, 50, 130));// 2 уровень
    enemies.push(new Devil(1200, 500, 300, 0, 300, 50, 110));// 2 уровень

    enemies.push(new Devil(1600, 795, 300, 0, 300, 50, 90));// 1 уровень
    enemies.push(new Devil(1200, 795, 300, 0, 300, 50, 130));// 1 уровень

    enemies.push(new Devil(350, 1105, 300, 0, 300, 50, 100));// 0 уровень
    enemies.push(new Devil(1300, 1105, 150, 0, 300, 50, 120));// 0 уровень
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

async function saveScore()
{
    let data = {
        score: hero.experience,
        lvl: 2,
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

