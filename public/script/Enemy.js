class enemy {
    constructor(canvasSelector, imageSrc) {
        this.canvas = document.querySelector(canvasSelector);
        this.ctx = this.canvas.getContext('2d');
        this.img = new Image();
        this.img.src = imageSrc;
        this.img.onload = () => this.init();

        this.SPRITE_WIDTH = 16;
        this.SPRITE_HEIGHT = 18;
        this.SCALE = 3;
        this.SCALED_WIDTH = this.SPRITE_WIDTH * this.SCALE;
        this.SCALED_HEIGHT = this.SPRITE_HEIGHT * this.SCALE;

        this.CYCLE_LOOP = [0, 1, 0, 2];
        this.currentLoopIndex = 0;
        this.frameCount = 0;

        this.characterX = 0;
        this.characterY = 0;

        this.MOVEMENT_SPEED = 10;
        this.currentDirection = 2;
    }

    init() {
        window.requestAnimationFrame(() => this.step());
    }

    drawFrame(frameX, frameY, canvasX, canvasY) {
        this.ctx.drawImage(
            this.img,
            frameX * this.SPRITE_WIDTH, frameY * this.SPRITE_HEIGHT, this.SPRITE_WIDTH, this.SPRITE_HEIGHT,
            canvasX, canvasY, this.SCALED_WIDTH, this.SCALED_HEIGHT
        );
    }

    step() {
        this.frameCount++;
        if (this.frameCount < 15) {
            window.requestAnimationFrame(() => this.step());
            return;
        }
        this.frameCount = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateCharacterPosition();
        this.drawFrame(this.CYCLE_LOOP[this.currentLoopIndex], this.currentDirection, this.characterX, this.characterY);
        this.currentLoopIndex++;
        if (this.currentLoopIndex >= this.CYCLE_LOOP.length) {
            this.currentLoopIndex = 0;
        }
        window.requestAnimationFrame(() => this.step());
    }

    updateCharacterPosition() {
        if (this.characterX <= 0) {
            this.currentDirection = 3;
        } else if (this.characterX + this.SCALED_WIDTH >= this.canvas.width) {
            this.currentDirection = 2;
        }

        switch (this.currentDirection) {
            case 2:
                this.characterX -= this.MOVEMENT_SPEED;
                break;
            case 3:
                this.characterX += this.MOVEMENT_SPEED;
                break;
        }

        if (this.characterX < 0) {
            this.characterX = 0;
        } else if (this.characterX + this.SCALED_WIDTH > this.canvas.width) {
            this.characterX = this.canvas.width - this.SCALED_WIDTH;
        }
    }
}