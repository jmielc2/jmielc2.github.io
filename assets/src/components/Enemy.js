import App from "../App.js"
import Entity from "./Entity.js"
import Cell from "./Cell.js"
import { Directions, NUM_DIRS } from "./Game.js"

export default class Enemy extends Entity {
    constructor(game, pos) {
        super(pos, Entity.Types.ENEMY);
        Enemy.game = game;
        this.setBehavior(Enemy.Modes.DEFAULT);
        this.time = 0;
        this.dir = Directions[Math.floor(Math.random() * NUM_DIRS)];
        this.explored = Array(App.DIM_Y).fill(0).map((x) => Array(App.DIM_X).fill(false));
        this.explored[this.pos.y][this.pos.x] = true;
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
        const start = Math.floor(Math.random() * 4);
        if (this.#countDirections() == 1) {
            for (let i = start; i < start + 4; i++) {
                const dir = Directions[i % 4];
                const next = this.calcMove(dir);
                if (Enemy.game.grid.isAccessible(next)) {
                    this.dir = dir;
                    return;
                }
            }
        } else {
            const opp = Directions[(this.dir.idx + 2) % 4];
            for (let i = start; i < start + 4; i++) {
                const dir = Directions[i % 4];
                if (dir == opp) {
                    continue;
                }
                const next = this.calcMove(dir);
                if (Enemy.game.grid.isAccessible(next)) {
                    this.dir = dir;
                    if (!this.explored[next.y][next.x]) {
                        return;
                    }
                }
            }
        }
    }

    #countDirections() {
        let count = 0;
        Directions.forEach((dir) => {
            const next = this.calcMove(dir);
            if (Enemy.game.grid.isAccessible(next)) {
                count++;
            }
        });
        return count;
    }

    static #default(deltaTime) {
        this.time += deltaTime;
        if (this.time >= (this.updateDelay * (1000 / App.FPS))) {
            if (this.#countDirections() > 2) {
                this.#chooseDirection();
            }
            if (!Enemy.game.grid.moveEntity(this, this.dir)) {
                this.#chooseDirection();
                Enemy.game.grid.moveEntity(this, this.dir);
            }
            Enemy.game.grid.getEntities(this.pos).forEach((entity) => {
                const type = entity.getType();
                switch(type) {
                case(Entity.Types.PLAYER):
                    Enemy.game.reset();
                    return;
                }
            })
            this.explored[this.pos.y][this.pos.x] = true;
            this.time = 0;
        }
    }

    static game;

    static Modes = {
        DEFAULT : {
            update : Enemy.#default,
            updateDelay : 9,
            color : {r:200, g:100, b:100}
        }
    }
}