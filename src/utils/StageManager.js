export class StageManager {
    static app;

    static initialize(appInstance) {
        this.app = appInstance;
    }

    static addChild(child) {
        this.app.stage.addChild(child);
    }

    static removeChild(child) {
        this.app.stage.addChild(child);
    }
}
