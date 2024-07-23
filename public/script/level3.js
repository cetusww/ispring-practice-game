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
    hero = new Hero(405, 500, 6, 0, 680);    
    portal = new Portal(2480, 1400);

    let texture //= PIXI.Texture.from('ground');

    arrayOfWall.push(new Wall(texture, 170, 1205, 64, 720)); //слева снизу
    arrayOfWall.push(new Wall(texture, 110, 430, 64, 810)); //слева сверху
    arrayOfWall.push(new Wall(texture, 2800, 770, 64, 1500)); //справа сверху
    arrayOfWall.push(new Wall(texture, 2635, 1530, 64, 130)); //справа снизу

    platforms.push(new Ground(texture, 1925, 467, 160, 40)); // 7 уровень
    platforms.push(new Ground(texture, 1080, 467, 160, 40)); // 7 уровень

    platforms.push(new Ground(texture, 395, 637, 170, 40)); // 6 уровень
    platforms.push(new Ground(texture, 2185, 635, 170, 40)); // 6 уровень
    platforms.push(new Ground(texture, 912, 635, 170, 40)); // 6 уровень

    platforms.push(new Ground(texture, 250, 850, 215, 40)); // 5 уровень

    platforms.push(new Ground(texture, 1930, 1075, 190, 40)); // 4 уровень
    platforms.push(new Ground(texture, 1300, 1120, 220, 40)); // 4 уровень
    platforms.push(new Ground(texture, 910, 1074, 200, 40)); // 4 уровень
    platforms.push(new Ground(texture, 250, 850, 215, 40)); // 4 уровень
    platforms.push(new Ground(texture, 1475, 880, 1620, 40)); // 4 уровень
    
    platforms.push(new Ground(texture, 415, 1245, 110, 40)); // 3 уровень
    platforms.push(new Ground(texture, 652, 1305, 95, 40)); // 3 уровень
    platforms.push(new Ground(texture, 2585, 1005, 240, 40)); // 3 уровень

    platforms.push(new Ground(texture, 2470, 1270, 380, 40)); // 2 уровень

    platforms.push(new Ground(texture, 2720, 1450, 270, 40)); // 1 уровень

    platforms.push(new Ground(texture, 1450, 1590, 2880, 40)); // пол - 0 уровень

    arrayOfBonus.push(new Shield(1930, 1010, 10))
    arrayOfBonus.push(new Shield(2725, 750, 10))
    arrayOfBonus.push(new Shield(915, 560, 10))
    arrayOfBonus.push(new Shield(1930, 400, 10))
    arrayOfBonus.push(new Shield(260, 1520, 10));

    arrayOfBonus.push(new Health(1300, 1060));
    arrayOfBonus.push(new Health(250, 780));
    arrayOfBonus.push(new Health(2725, 1380));
    arrayOfBonus.push(new Health(1080, 400));
    arrayOfBonus.push(new Health(2180, 575));

    arrayOfStalactite.push(new Stalactite(1950, 1100, 700, 200));
    arrayOfStalactite.push(new Stalactite(1890, 1090, 700, 200));
    arrayOfStalactite.push(new Stalactite(1330, 1150, 700, 200));
    arrayOfStalactite.push(new Stalactite(1510, 940, 700, 200));
    arrayOfStalactite.push(new Stalactite(880, 1090, 700, 200));
    arrayOfStalactite.push(new Stalactite(955, 1100, 700, 200));
    arrayOfStalactite.push(new Stalactite(1100, 503, 700, 200));
    arrayOfStalactite.push(new Stalactite(1950, 503, 700, 200));

    fires.push(new Fire(530, 1520));
    fires.push(new Fire(1130, 1520));
    fires.push(new Fire(1430, 1520));
    fires.push(new Fire(1930, 1520));

    enemies.push(new Boss(1440, 1490, 700, 500, 500));
}

async function saveScore()
{
    let nextLevel = 3;
    if (hero.isWin)
    {
        nextLevel = 4;
    }
    let data = {
        score: hero.experience / hero.time,
        currentLvl: 3,
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

