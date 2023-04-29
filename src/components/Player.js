import App from "../App.js"
import Entity from "./Entity.js"
import Cell from "./Cell.js"
import Thread from "./Thread.js"
import { Directions, NUM_DIRS } from "../pages/Game.js"

export default class Player extends Entity {
    constructor(game) {
        super(Entity.Types.PLAYER);
        Player.game = game;
        this.setBehavior(Player.Modes.DEFAULT);
        this.time = 0;
        this.input = this.inputDelay;
        this.dir = null;
        this.hasThread = false;
    }

    setBehavior(mode) {
        this.updateDelay = mode.updateDelay;
        this.inputDelay = mode.inputDelay;
        this.update = mode.update;
        this.color = mode.color;
        this.radius = mode.radius;
        this.brightness = mode.brightness;
    }

    reset() {
        this.setBehavior(Player.Modes.DEFAULT);
        this.time = 0;
        this.input = this.inputDelay;
        this.dir = null;
        this.hasThread = false;
    }

    start(pos) {
        this.time = 0;
        this.input = this.inputDelay;
        this.dir = null;
        this.setPos(pos);
    }

    #getDirection() {
        let count = 0;
        let dir;
        for (let i = 0; i < NUM_DIRS; i++) {
            if (App.canvas.keyIsDown(Directions[i].key)) {
                dir = Directions[i];
                count++;
            }
        }
        return (count == 1)? dir : null;
    }

    draw() {
        App.canvas.noStroke();
        App.canvas.fill(this.color.r, this.color.g, this.color.b);
        App.canvas.circle(
            this.pos.x * Cell.dim + (Cell.dim / 2),
            this.pos.y * Cell.dim + (Cell.dim / 2),
            Cell.dim * 0.75
        );
    }

    static #default(deltaTime) {
        this.time += deltaTime;
        this.input += deltaTime;
        if (this.input >= (this.inputDelay * (1000 / App.FPS)) && App.canvas.keyIsPressed) {
            this.dir = this.#getDirection()
            if (this.dir) {
                this.input = 0;
            }
        }
        if (this.time >= (this.updateDelay * (1000 / App.FPS))) {
            if (this.dir) {
                let thread = null;
                if (this.hasThread) {
                    thread = new Thread(this.pos, this.dir);
                }
                if (Player.game.grid.moveEntity(this, this.dir)) {
                    Player.game.grid.getEntities(this.pos).forEach((entity) => {
                        const type = entity.getType();
                        switch (type) {
                        case (Entity.Types.EXIT):
                            Player.game.nextLevel();
                            return;
                        case (Entity.Types.ENEMY):
                            Player.game.reset();
                            return;
                        case (Entity.Types.THREAD):
                            Player.game.removeEntity(entity);
                            thread = null;
                            return;
                        case (Entity.Types.ROPE):
                            Player.game.removeEntity(entity);
                            this.setBehavior(Player.Modes.W_ROPE);
                            this.hasThread = true;
                            return;
                        }
                    });
                    if (thread) {
                        Player.game.addEntity(thread);
                    }
                }
            }
            this.time = 0;
            this.dir = null;
        }
        this.drawSpotlight(Player.game.grid, this.radius, this.brightness);
    }

    static game;

    static Modes = {
        DEFAULT : {
            update : Player.#default,
            updateDelay : 6,
            inputDelay : 2,
            color : {r:100, g:100, b:200},
            radius : 3,
            brightness : 0.3,
        },
        W_ROPE : {
            update : Player.#default,
            updateDelay : 6,
            inputDelay : 2,
            color : {r:100, g:100, b:200},
            radius : 5,
            brightness : 0.5,
        }
    }
}