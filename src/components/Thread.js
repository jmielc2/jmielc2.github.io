import App from "../App.js"
import Entity from "./Entity.js"
import Cell from "./Cell.js"

const THICKNESS = 3;
const COLOR = {r:210, g:175, b:55}

export default class Thread extends Entity {
    constructor(pos, dir) {
        super(Entity.Types.THREAD);
        this.setPos(pos);
        this.dir = dir;
    }

    draw() {
        App.canvas.stroke(COLOR.r, COLOR.g, COLOR.b);
        App.canvas.strokeWeight(THICKNESS);
        App.canvas.line(
            this.pos.x * Cell.dim + (Cell.dim / 2),
            this.pos.y * Cell.dim + (Cell.dim / 2),
            (this.pos.x + this.dir.x) * Cell.dim + (Cell.dim / 2),
            (this.pos.y + this.dir.y) * Cell.dim + (Cell.dim / 2),
        );
    }

    update(deltaTime) {
        this.drawSpotlight(Thread.game.grid, 1, 0.1);
    }

    static setGame(game) {
        Thread.game = game;
    }

    static game;
}