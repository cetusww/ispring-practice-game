import * as PIXI from 'pixijs'
import imagesMap from '../../gamedata/images.json';

export class Loader {
    static prefixAssets(assetMap, pathPrefix) {
        const prefixedAssetMap = [];

        for (const key in assetMap) {
            prefixedAssetMap.push({alias: [key], src: pathPrefix + assetMap[key]})
        }
        return prefixedAssetMap
    }

    static async loadAssets() {
        try {
            await PIXI.Assets.load(Loader.prefixAssets(imagesMap, "assets/images/"));
            const texture = PIXI.Assets.get('level1_bg');
            console.log(texture)
            console.log('Available assets:', PIXI.Assets.cache);
        } catch (error) {
            console.error(`Failed to load textures:`, error);
        }
    }
}
