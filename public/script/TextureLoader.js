// массивы со спрайтами

const hero_walk = [];
const experiences = [];
const hero_jump = [];
const hero_idle = [];
const hero_dead = [];
const devil_walk = [];
const devil_idle = [];
const bat_fly_horizontal = [];
const bat_fly_vertical = [];
const hero_shoot = [];
const hero_walk_shoot = [];
const fire_anim = [];
const mushroom_idle = [];
const mushroom_active = [];
const smoke_anim = [];
const boss_idle = [];
const boss_walk = [];
const boss_dead = [];

const textureSources =
    [
        { alias: 'level1_map', src: '/images/first_level_map.jpg' },
        { alias: 'level2_map', src: '/images/level2_map.png' },
        { alias: 'level3_map', src: '/images/level3_map.png' },
        { alias: 'hero_idle_group', src: '/images/JSON/hero_idle_group.json' },
        { alias: 'hero_walk_group', src: '/images/JSON/hero_walk_group.json' },
        { alias: 'hero_jump_group', src: '/images/JSON/hero_jump_group.json' },
        { alias: 'hero_shoot_group', src: '/images/JSON/hero_shoot_group.json' },
        { alias: 'hero_walk_shoot_group', src: '/images/JSON/hero_walk_shoot_group.json' },
        { alias: 'hero_dead_group', src: '/images/JSON/hero_dead_group.json' },
        { alias: 'experience', src: '/images/experience.svg' },
        { alias: 'ground', src: '/images/ground.svg' },
        { alias: 'bullet', src: '/images/bullet.png' },
        { alias: 'hero_beacon', src: '/images/hero_beacon.png' },
        { alias: 'enemy_beacon', src: '/images/enemy_beacon.png' },
        { alias: 'fireball', src: '/images/fireball.svg' },
        { alias: 'stalactite', src: '/images/stalactite.png' },
        { alias: 'bat', src: '/images/JSON/bat_group.json' },
        { alias: 'poison', src: '/images/poison.png' },
        { alias: 'devil', src: '/images/JSON/devil.json' },
        { alias: 'fire', src: '/images/JSON/fire.json' },
        { alias: 'mushroom', src: '/images/JSON/mushroom.json' },
        { alias: 'smoke', src: '/images/JSON/smoke.json' },
        { alias: 'shield', src: '/images/shield.png' },
        { alias: 'shield_active', src: '/images/shield_active.png' },
        { alias: 'health', src: '/images/health.png' },
        { alias: 'portal', src: '/images/portal.png' },
        { alias: 'non_active_portal', src: '/images/non_active_portal.png' },
        { alias: 'boss', src: '/images/JSON/boss.json' },
        { alias: 'shot', src: '/images/shot.png' },
        { alias: 'sound_on', src: '/images/sound_on.png' },
        { alias: 'sound_off', src: '/images/sound_off.png' },
    ];

function loadTextures() {
    for (let i = 0; i < 10; i++) {
        hero_idle.push(PIXI.Texture.from(`hero_idle${1 + i}.png`));
    }
    for (let i = 0; i < 8; i++) {
        hero_walk.push(PIXI.Texture.from(`hero_walk${1 + i}.png`));
    }
    for (let i = 0; i < 10; i++) {
        hero_jump.push(PIXI.Texture.from(`hero_jump${1 + i}.png`));
    }
    for (let i = 9; i < 10; i++) {
        hero_dead.push(PIXI.Texture.from(`hero_dead${1 + i}.png`));
    }
    for (let i = 0; i < 4; i++) {
        devil_walk.push(PIXI.Texture.from(`devil_walk${1 + i}.png`));
    }
    devil_idle.push(PIXI.Texture.from(`devil_idle.png`));
    for (let i = 0; i < 4; i++) {
        bat_fly_vertical.push(PIXI.Texture.from(`bat_fly_vertical${1 + i}.png`));
    }
    for (let i = 0; i < 4; i++) {
        bat_fly_horizontal.push(PIXI.Texture.from(`bat_fly_horizontal${1 + i}.png`));
    }
    for (let i = 0; i < 4; i++) {
        hero_shoot.push(PIXI.Texture.from(`hero_shoot${1 + i}.png`));
    }
    for (let i = 0; i < 9; i++) {
        hero_walk_shoot.push(PIXI.Texture.from(`hero_walk_shoot${1 + i}.png`));
    }
    for (let i = 0; i < 50; i++) {
        fire_anim.push(PIXI.Texture.from(`fire${1 + i}.png`));
    }
    for (let i = 0; i < 14; i++) {
        mushroom_idle.push(PIXI.Texture.from(`mushroomIdle${1 + i}.png`));
    }
    for (let i = 0; i < 8; i++) {
        mushroom_active.push(PIXI.Texture.from(`mushroomActive${1 + i}.png`));
    }
    for (let i = 0; i < 13; i++) {
        smoke_anim.push(PIXI.Texture.from(`smoke${1 + i}.png`));
    }
    for (let i = 0; i < 4; i++) {
        boss_idle.push(PIXI.Texture.from(`bossIdle${1 + i}.png`));
    }
    for (let i = 0; i < 8; i++) {
        boss_walk.push(PIXI.Texture.from(`bossWalk${1 + i}.png`));
    }
    for (let i = 0; i < 8; i++) {
        boss_dead.push(PIXI.Texture.from(`bossDead${1 + i}.png`));
    }
}