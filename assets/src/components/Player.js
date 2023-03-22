import Entity from "./Entity.js"
import { App } from "../App.js"

export default class Player extends Entity {
    constructor(game, pos) {
        super(pos);
        Player.game = game;
        this.time = 0;
        this.setBehavior(Player.Modes.DEFAULT);
    }

    setBehavior(mode) {
        this.updateTime = mode.updateTime;
        this.update = mode.update;
    }

    #getDirection() {
        let count = 0;
        
    }

    static #default = function(self, deltaTime) {
        self.time += deltaTime;
        if (self.time >= self.updateTime) {
            const dir = self.#getDirection()
            if (dir) {
                self.move(dir);
            }
            this.time = 0;
        }
    }

    static game;

    static Modes = {
        DEFAULT : {
            update : Player.#default,
            updateTime : 500                                 
        }
    }
}