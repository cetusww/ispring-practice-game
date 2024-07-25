const HEROPOS = [2800, 100];
let SCENE_WIDTH;
let SCENE_HEIGHT;
let levelData;

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
    levelData = loadJSONSync('../script/multiplayer/levelMultiplayer.json');
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

    hero = new Hero(250, 100, 6, 0, 680);

    heroView = new HeroView(HEROPOS[0], HEROPOS[1]);

    let platformsData = Array.from(levelData.platforms);
    platformsData.forEach(item => {
        platforms.push(new Ground(item['texture'], item['posX'], item['posY'], item['width'], item['height']));
    });
    let woodenPlanksData = Array.from(levelData.woodenPlanks);
    woodenPlanksData.forEach(item => {
        woodenPlanks.push(new WoodenPlank(item['texture'], item['posX'], item['posY'], item['width'], item['height']));
    });
    let wallsData = Array.from(levelData.walls);
    wallsData.forEach(item => {
        arrayOfWall.push(new Wall(item['texture'], item['posX'], item['posY'], item['width'], item['height']));
    });
    let devilsData = Array.from(levelData.devils);
    devilsData.forEach(item => {
        enemies.push(new Devil(item['posX'], item['posY'], item['zoneWidth'], item['zoneHeight'], item['visibilityZoneWidth'], item['visibilityZoneHeight'], item['experience']));
    });
    let batsData = Array.from(levelData.bats);
    batsData.forEach(item => {
        enemies.push(new Bat(item['posX'], item['posY'], item['zoneWidth'], item['zoneHeight'], item['visibilityZoneWidth'], item['visibilityZoneHeight'], item['experience']));
    });
    let shieldsData = Array.from(levelData.shields);
    shieldsData.forEach(item => {
        arrayOfBonus.push(new Shield(item['posX'], item['posY'], item['duration']));
    });
    let healthData = Array.from(levelData.health);
    healthData.forEach(item => {
        arrayOfBonus.push(new Health(item['posX'], item['posY']));
    });
    let stalactitesData = Array.from(levelData.stalactites);
    stalactitesData.forEach(item => {
        arrayOfStalactite.push(new Stalactite(item['posX'], item['posY'], item['zoneHeight'], item['zoneWidth']));
    });
    let mushroomsData = Array.from(levelData.mushrooms);
    mushroomsData.forEach(item => {
        enemies.push(new Mushroom(item['posX'], item['posY'], item['visibilityZoneWidth'], item['attackZoneWidth'], item['experience']));
    });
    let firesData = Array.from(levelData.fires);
    firesData.forEach(item => {
        fires.push(new Fire(item['posX'], item['posY']));
    });
    let bossData = Array.from(levelData.boss);
    bossData.forEach(item => {
        enemies.push(new Boss(item['posX'], item['posY'], item['zoneWidth'], item['visibilityZoneWidth'], item['visibilityZoneHeight']));
    });
}

function levelView() {
    arrayOfWall.forEach(wall => {
        wall.view();
    });
    woodenPlanks.forEach(woodenPlank => {
        woodenPlank.view();
    });
    platforms.forEach(platform => {
        platform.view();
    });
    for (let i = 0; i < arrayOfBonus.length; i++) {
        arrayOfBonus[i].view();
        arrayOfBonus[i].id = i;
    };
    arrayOfStalactite.forEach(stalactite => {
        stalactite.random = false;
        stalactite.view();
    });
    fires.forEach(fire => {
        fire.view();
    });
    heroView.view();
    hero.view();
    hero.updateMap();
}

async function saveScore() {
    let data = {
        'username': username,
        'opponentname': opponentname,
    }
    const stringifyData = JSON.stringify(data)
    const response = await fetch('/api/multiplayer-score', {
        method: "POST",
        body: stringifyData,
        headers: {
            "Content-Type": "application/json",
        },
    });
}