const SCENE_WIDTH = 2560;
const SCENE_HEIGHT = 1460;
function levelCreate()
{
    background = PIXI.Sprite.from('level1_map');
    background.anchor.set(0);

    function resizeBackground()
    {
        background.width = SCENE_WIDTH;
        background.height = SCENE_HEIGHT;
    }
    scene.addChild(background);
    resizeBackground();
    hero = new Hero(400, 100, 6, 0, 680);
    portal = new Portal(2300, 1300);


    let texture //= PIXI.Texture.from('ground');
    platforms.push(new Ground(texture, 420, 440, 470, 40)); // 5 уровень

    platforms.push(new Ground(texture, 1243, 580, 605, 40)); // 4 уровень
    platforms.push(new Ground(texture, 2107, 580, 905, 40)); // 4 уровень
    woodenPlanks.push(new WoodenPlank(texture, 870, 580, 140, 40));// 4 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1600, 580, 110, 40));//4 уровень

    platforms.push(new Ground(texture, 77, 820, 154, 40)); // 3 уровень
    platforms.push(new Ground(texture, 857, 820, 1195, 40)); // 3 уровень
    platforms.push(new Ground(texture, 1745, 820, 380, 40)); // 3 уровень
    platforms.push(new Ground(texture, 2305, 820, 510, 40)); // 3 уровень
    woodenPlanks.push(new WoodenPlank(texture, 205, 820, 100, 40));// 3 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1505, 820, 100, 40));// 3 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1990, 820, 110, 40));// 3 уровень

    platforms.push(new Ground(texture, 77, 1080, 154, 40)); // 2 уровень
    platforms.push(new Ground(texture, 465, 1080, 415, 40)); // 2 уровень
    platforms.push(new Ground(texture, 1080, 1080, 600, 40)); // 2 уровень
    platforms.push(new Ground(texture, 1740, 1080, 380, 40)); // 2 уровень
    woodenPlanks.push(new WoodenPlank(texture, 205, 1080, 100, 40));// 2 уровень
    woodenPlanks.push(new WoodenPlank(texture, 725, 1080, 110, 40));// 2 уровень
    woodenPlanks.push(new WoodenPlank(texture, 1465, 1080, 180, 40));// 2 уровень
    platforms.push(new Ground(texture, 2290, 1190, 540, 40)); // 1 уровень
    platforms.push(new Ground(texture, 1280, 1400, 2560, 40)); // пол - 0 уровень

    arrayOfBonus.push(new Shield(450, 880, 10));
    arrayOfBonus.push(new Health(450, 520));
    arrayOfBonus.push(new Shield(350, 520, 10));
    arrayOfBonus.push(new Health(1900, 780)); // 1 уровень
    let stalactite = new Stalactite(100, 100, 20);
    stalactite.view();

    enemies.push(new Bat(300, 350, 200, 200, 400, 400));// bat test

    enemies.push(new Devil(1600, 530, 300, 0, 300, 50, 130));// 4 уровень
    enemies.push(new Devil(1200, 530, 300, 0, 300, 50, 110));// 4 уровень

    enemies.push(new Devil(1600, 770, 300, 0, 300, 50, 90));// 3 уровень
    enemies.push(new Devil(1200, 770, 300, 0, 300, 50, 130));// 3 уровень

    enemies.push(new Devil(350, 1030, 300, 0, 300, 50, 100));// 2 уровень
    enemies.push(new Devil(1300, 1030, 150, 0, 300, 50, 120));// 2 уровень

    woodenPlanks.forEach(woodenPlank =>
    {
        woodenPlank.view();
    })

    platforms.forEach(platform =>
    {
        platform.view();
    })
    enemies.forEach(enemy =>
    {
        enemy.view();
    });
    arrayOfBonus.forEach(bonus =>
    {
        bonus.view();
    });
    portal.view();
    hero.view();
}

async function saveScore()
{
    let data = {
        score: hero.experience,
        lvl: 1,
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

