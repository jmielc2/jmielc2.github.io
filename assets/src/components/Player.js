import { App } from "../App.js"
import Entity from "./Entity.js"
import Node from "./Node.js"
import { Directions, NUM_DIRS } from "./Game.js"
import { isValidPos } from "./utils/GameUtils.js"

export default class Player extends Entity {
    constructor(game, pos) {
        super(pos);
        Player.game = game;
        this.setBehavior(Player.Modes.DEFAULT);
        this.time = 0;
        this.input = this.inputDelay;
        this.dir = null;
    }

    setBehavior(mode) {
        this.updateDelay = mode.updateDelay;
        this.inputDelay = mode.inputDelay;
        this.update = mode.update;
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
                const next = this.calcMove(this.dir);
                if (Player.game.grid.isValidPos(next) && Player.game.grid.getNodeType(next) == Node.Types.EXIT) {
                    Player.game.nextLevel();
                } else if (Player.game.grid.isValidPos(next) && Player.game.grid.getNodeType(next) == Node.Types.PATH) {
                    Player.game.grid.setNodeType(this.pos, Node.Types.PATH);
                    this.move(this.dir);
                    Player.game.grid.setNodeType(this.pos, Node.Types.PLAYER);
                }
            }
            this.time = 0;
            this.dir = null;
        }
    }

    static game;

    static Modes = {
        DEFAULT : {
            update : Player.#default,
            updateDelay : 5,
            inputDelay : 2,
        }
    }
}