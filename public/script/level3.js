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
    portal = new Portal(2480, 1400);

    let texture //= PIXI.Texture.from('ground');

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

    platforms.push(new Ground(texture, 2470, 1270, 380, 40)); // 2 уровень

    platforms.push(new Ground(texture, 2720, 1450, 270, 40)); // 1 уровень

    platforms.push(new Ground(texture, 1450, 1590, 2880, 40)); // пол - 0 уровень

    arrayOfBonus.push(new Shield(655, 1250, 20))
    arrayOfBonus.push(new Shield(2725, 750, 20))
    arrayOfBonus.push(new Shield(915, 560, 20))
    arrayOfBonus.push(new Shield(1930, 400, 20))

    arrayOfBonus.push(new Health(260, 1520));
    arrayOfBonus.push(new Health(2725, 1380));
    arrayOfBonus.push(new Health(1080, 400));
    arrayOfBonus.push(new Health(2180, 575));

    arrayOfStalactite.push(new Stalactite(1100, 503, 700, 200));
    arrayOfStalactite.push(new Stalactite(1950, 503, 700, 200));

    enemies.push(new Boss(1440, 1490, 700));
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

