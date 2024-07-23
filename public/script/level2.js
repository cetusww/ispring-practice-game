let SCENE_WIDTH
let SCENE_HEIGHT
let levelData

function loadJSONSync(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    } else {
        throw new Error('Ошибка: ' + xhr.status);
    }
}

try {
    levelData = loadJSONSync('../gamedata/level2.json');
    SCENE_WIDTH = levelData.scene[0]['width'];
    SCENE_HEIGHT = levelData.scene[0]['height'];
} catch (error) {
    console.error(error);
}

function resizeWindow() {
    let relationshipWidth = window.innerWidth / SCENE_WIDTH;
    let relationshipHeight = window.innerHeight / SCENE_HEIGHT;
    if (relationshipWidth > 1 || relationshipHeight > 1) {
        if (relationshipWidth > relationshipHeight) {
            sceneScale = relationshipWidth;
        } else {
            sceneScale = relationshipHeight;
        }
        scene.scale.x = sceneScale;
        scene.scale.y = sceneScale;
    } else {
        sceneScale = 1;
    }
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

function levelCreate() {
    function resizeBackground() {
        background.width = SCENE_WIDTH;
        background.height = SCENE_HEIGHT;
    }
    background = PIXI.Sprite.from(levelData.background);
    background.anchor.set(0);
    scene.addChild(background);
    resizeBackground();

    hero = new Hero(levelData.hero[0]['posX'], levelData.hero[0]['posY'], levelData.hero[0]['speedX'], levelData.hero[0]['speedY'], levelData.hero[0]['experienceMax']);
    portal = new Portal(levelData.portal[0]['posX'], levelData.portal[0]['posY']);

    let platformsData = Array.from(levelData.platforms)
    platformsData.forEach(item => {
        platforms.push(new Ground(item['texture'], item['posX'], item['posY'], item['width'], item['height']))
    });
    let woodenPlanksData = Array.from(levelData.woodenPlanks)
    woodenPlanksData.forEach(item => {
        woodenPlanks.push(new WoodenPlank(item['texture'], item['posX'], item['posY'], item['width'], item['height']))
    });
    let wallsData = Array.from(levelData.walls)
    wallsData.forEach(item => {
        arrayOfWall.push(new Wall(item['texture'], item['posX'], item['posY'], item['width'], item['height']))
    });
    let devilsData = Array.from(levelData.devils)
    devilsData.forEach(item => {
        enemies.push(new Devil(item['posX'], item['posY'], item['zoneWidth'], item['zoneHeight'], item['visibilityZoneWidth'], item['visibilityZoneHeight'], item['experience']))
    });
    let batsData = Array.from(levelData.bats)
    batsData.forEach(item => {
        enemies.push(new Bat(item['posX'], item['posY'], item['zoneWidth'], item['zoneHeight'], item['visibilityZoneWidth'], item['visibilityZoneHeight'], item['experience']))
    });
    let shieldsData = Array.from(levelData.shields)
    shieldsData.forEach(item => {
        arrayOfBonus.push(new Shield(item['posX'], item['posY'], item['duration']))
    });
    let healthData = Array.from(levelData.health)
    healthData.forEach(item => {
        arrayOfBonus.push(new Health(item['posX'], item['posY']))
    });
    let stalactitesData = Array.from(levelData.stalactites)
    stalactitesData.forEach(item => {
        arrayOfStalactite.push(new Stalactite(item['posX'], item['posY'], item['zoneHeight'], item['zoneWidth']))
    });
    let mushroomsData = Array.from(levelData.mushrooms)
    mushroomsData.forEach(item => {
        enemies.push(new Mushroom(item['posX'], item['posY'], item['visibilityZoneWidth'], item['attackZoneWidth'], item['experience']))
    });
    let firesData = Array.from(levelData.fires)
    firesData.forEach(item => {
        fires.push(new Fire(item['posX'], item['posY']))
    });
}

function levelView()
{
    portal.view();
    arrayOfWall.forEach(wall => {
        wall.view();
    })
    woodenPlanks.forEach(woodenPlank =>
    {
        woodenPlank.view();
    })

    platforms.forEach(platform =>
    {
        platform.view();
    })
    let experienceMax = 0;
    enemies.forEach(enemy =>
    {
        enemy.view();
        experienceMax += enemy.experience;
    });
    arrayOfBonus.forEach(bonus =>
    {
        bonus.view();
    });
    arrayOfStalactite.forEach(stalactite =>
    {
        stalactite.view();
    });
    fires.forEach(fire =>
    {
        fire.view();
    });
    
    hero.experienceMax = experienceMax;
    hero.view();
}





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
    
    arrayOfBonus.push(new Shield(200, 1105, 10));
    arrayOfBonus.push(new Shield(2800, 1105, 10));
    
    arrayOfBonus.push(new Health(100, 160));
    arrayOfBonus.push(new Health(200, 500));
    arrayOfBonus.push(new Health(1350, 500));
    arrayOfBonus.push(new Health(2750, 500));


    arrayOfStalactite.push(new Stalactite(900, 60, 700, 200));
    arrayOfStalactite.push(new Stalactite(1170, 60, 700, 200));
    arrayOfStalactite.push(new Stalactite(1700, 60, 700, 200));
    arrayOfStalactite.push(new Stalactite(2200, 60, 700, 200));
    arrayOfStalactite.push(new Stalactite(2700, 60, 700, 200));
    arrayOfStalactite.push(new Stalactite(2560, 60, 700, 200));


    enemies.push(new Devil(500, 500, 300, 0, 300, 50, 130));// 2 уровень
    enemies.push(new Bat(1000, 320, 180, 150, 300, 300, 140));// bat 
    

    enemies.push(new Devil(1560, 500, 160, 0, 200, 50, 130));// 2 уровень
    enemies.push(new Bat(1880, 180, 520, 70, 300, 300, 130));// bat 
    enemies.push(new Mushroom(2270, 500, 300, 240, 150));// mushroom test 2 уровень


    enemies.push(new Bat(2640, 390, 60, 280, 150, 300, 130));// bat 


    enemies.push(new Mushroom(1000, 795, 300, 250, 130));// mushroom test 1 уровень
    enemies.push(new Devil(400, 795, 200, 0, 300, 50, 130));// 1 уровень
    fires.push(new Fire(630, 780)); //1 уровень

    enemies.push(new Devil(1800, 795, 300, 0, 300, 50, 130));// 1 уровень
    enemies.push(new Devil(2100, 795, 400, 0, 300, 50, 130));// 1 уровень



    enemies.push(new Mushroom(400, 1105, 300, 250, 130));// mushroom test 0 уровень
    enemies.push(new Devil(800, 1105, 300, 0, 300, 50, 130));// 0 уровень
    fires.push(new Fire(1200, 1100)); //0 уровень
    enemies.push(new Bat(1450, 1000, 60, 100, 250, 120, 130));// bat 
    enemies.push(new Mushroom(2700, 1105, 300, 250, 130));// mushroom test 0 уровень
    enemies.push(new Devil(2100, 1105, 300, 0, 300, 50, 130));// 0 уровень
    fires.push(new Fire(2500, 1100)); //0 уровень




async function saveScore(isWin)
{
    let nextLevel = 2;
    if (isWin)
    {
        nextLevel = 3;
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

