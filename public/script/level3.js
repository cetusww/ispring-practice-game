const SCENE_WIDTH = 2880;
const SCENE_HEIGHT = 1920;
function levelCreate()
{
    background = PIXI.Sprite.from('level3_map');
    background.anchor.set(0);

    function resizeBackground()
    {
        background.width = SCENE_WIDTH;
        background.height = SCENE_HEIGHT;
    }
    scene.addChild(background);
    resizeBackground();
    hero = new Hero(250, 100, 6, 0, 680);
    portal = new Portal(2070, 1020);

    let texture = PIXI.Texture.from('ground');


    arrayOfWall.push(new Wall(texture, 170, 1205, 64, 720)); //слева снизу
    arrayOfWall.push(new Wall(texture, 110, 430, 64, 810)); //слева сверху
    arrayOfWall.push(new Wall(texture, 2800, 770, 64, 1500)); //справа сверху
    arrayOfWall.push(new Wall(texture, 2635, 1530, 64, 130)); //справа снизу

    platforms.push(new Ground(texture, 1925, 467, 160, 40)); // 7 уровень
    platforms.push(new Ground(texture, 1080, 467, 160, 40)); // 7 уровень

    platforms.push(new Ground(texture, 2185, 635, 170, 40)); // 6 уровень
    platforms.push(new Ground(texture, 912, 635, 170, 40)); // 6 уровень

    platforms.push(new Ground(texture, 250, 850, 215, 40)); // 5 уровень

    platforms.push(new Ground(texture, 250, 850, 215, 40)); // 4 уровень
    platforms.push(new Ground(texture, 1475, 880, 1620, 40)); // 4 уровень
    
    platforms.push(new Ground(texture, 652, 1305, 95, 40)); // 3 уровень
    platforms.push(new Ground(texture, 2585, 1005, 240, 40)); // 3 уровень

    platforms.push(new Ground(texture, 2470, 1250, 380, 40)); // 2 уровень

    platforms.push(new Ground(texture, 2720, 1450, 270, 40)); // 1 уровень

    platforms.push(new Ground(texture, 1450, 1590, 2880, 40)); // пол - 0 уровень

    arrayOfBonus.push(new Shield(655, 1250, 20))
    arrayOfBonus.push(new Shield(2725, 750, 20))
    arrayOfBonus.push(new Shield(915, 560, 20))

    arrayOfBonus.push(new Health(260, 1520));
    arrayOfBonus.push(new Health(2725, 1380));
    
    // arrayOfBonus.push(new Shield(200, 1105, 10));
    // arrayOfBonus.push(new Shield(2800, 1105, 10));
    // arrayOfBonus.push(new Health(100, 160));
    // arrayOfBonus.push(new Health(200, 500));
    // arrayOfBonus.push(new Health(1350, 500));
    // arrayOfBonus.push(new Health(2750, 500));


    // arrayOfStalactite.push(new Stalactite(900, 60, 700, 200));
    // arrayOfStalactite.push(new Stalactite(1170, 60, 700, 200));
    // arrayOfStalactite.push(new Stalactite(1700, 60, 700, 200));
    // arrayOfStalactite.push(new Stalactite(2200, 60, 700, 200));
    // arrayOfStalactite.push(new Stalactite(2700, 60, 700, 200));
    // arrayOfStalactite.push(new Stalactite(2560, 60, 700, 200));

    enemies.push(new Boss(1440, 1490, 700)); //boss test

    // enemies.push(new Devil(500, 500, 300, 0, 300, 50, 130));// 2 уровень
    // enemies.push(new Bat(1000, 320, 180, 150, 300, 300, 140));// bat 
    

    // enemies.push(new Devil(1560, 500, 160, 0, 200, 50, 130));// 2 уровень
    // enemies.push(new Bat(1880, 180, 520, 70, 300, 300, 130));// bat 
    // enemies.push(new Mushroom(2270, 500, 300, 240, 150));// mushroom test 2 уровень


    // enemies.push(new Bat(2640, 390, 60, 280, 150, 300, 130));// bat 


    // enemies.push(new Mushroom(1000, 795, 300, 250, 130));// mushroom test 1 уровень
    // enemies.push(new Devil(400, 795, 200, 0, 300, 50, 130));// 1 уровень
    // fires.push(new Fire(630, 780)); //1 уровень

    // enemies.push(new Devil(1800, 795, 300, 0, 300, 50, 130));// 1 уровень
    // enemies.push(new Devil(2100, 795, 400, 0, 300, 50, 130));// 1 уровень



    // enemies.push(new Mushroom(400, 1105, 300, 250, 130));// mushroom test 0 уровень
    // enemies.push(new Devil(800, 1105, 300, 0, 300, 50, 130));// 0 уровень
    // fires.push(new Fire(1200, 1100)); //0 уровень
    // enemies.push(new Bat(1450, 1000, 60, 100, 250, 120, 130));// bat 
    // enemies.push(new Mushroom(2700, 1105, 300, 250, 130));// mushroom test 0 уровень
    // enemies.push(new Devil(2100, 1105, 300, 0, 300, 50, 130));// 0 уровень
    // fires.push(new Fire(2500, 1100)); //0 уровень
    // enemies.push(new Devil(1600, 500, 300, 0, 300, 50, 130));// 2 уровень
    // enemies.push(new Devil(1200, 500, 300, 0, 300, 50, 110));// 2 уровень

    // enemies.push(new Devil(1600, 795, 300, 0, 300, 50, 90));// 1 уровень
    // enemies.push(new Devil(1200, 795, 300, 0, 300, 50, 130));// 1 уровень

    // enemies.push(new Devil(350, 1105, 300, 0, 300, 50, 100));// 0 уровень
    // enemies.push(new Devil(1300, 1105, 150, 0, 300, 50, 120));// 0 уровень
}

async function saveScore(isWin)
{
    let nextLevel = 3;
    if (isWin)
    {
        nextLevel = 4;
    }
    let data = {
        score: hero.experience,
        currentLvl: 2,
        nextLvl: nextLevel,
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

