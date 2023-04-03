import App from "../App.js"
import Entity from "./Entity.js"
import Cell from "./Cell.js"
import { Directions, NUM_DIRS } from "./Game.js"
import { isValidPos } from "./utils/GameUtils.js"

export default class Enemy extends Entity {
    constructor(game, pos) {
        super(pos, Entity.Types.ENEMY);
        Enemy.game = game;
        this.setBehavior(Enemy.Modes.DEFAULT);
        this.time = 0;
        this.dir = Directions[Math.floor(Math.random() * NUM_DIRS)];
    }

    setBehavior(mode) {
        this.updateDelay = mode.updateDelay;
        this.update = mode.update;
        this.color = mode.color;
    }

    draw() {
        App.canvas.fill(this.color.r, this.color.g, this.color.b);
        App.canvas.circle(
            this.pos.x * Cell.dim + (Cell.dim / 2),
            this.pos.y * Cell.dim + (Cell.dim / 2),
            Cell.dim
        );
    }

    #chooseDirection() {

    }

    static #default(deltaTime) {
        this.time += deltaTime;
        if (this.time >= (this.updateDelay * (1000 / App.FPS))) {
            
            this.time = 0;
        }
    }

    static game;

    static Modes = {
        DEFAULT : {
            update : Enemy.#default,
            updateDelay : 12,
            color : {r:200, g:100, b:100}
        }
    }
}