import Cell from "./Cell.js"
import { App } from "../App.js"

export default class Game {
    constructor(app) {
        Game.app = app;
        this.iter = 0;
        this.update = this.#startup;
    }

    reset(p) {

    }

    init(p) {
        return;
    }

    #refresh(p) {
        p.rectMode(p.CORNER);
        for (let i = 0; i < Game.app.WIDTH; i += Cell.dim) {
            for (let j = 0; j < Game.app.HEIGHT; j += Cell.dim) {
                if (((j / Cell.dim) % 2) || ((i / Cell.dim) % 2)) {
                    p.fill(255);
                } else {
                    p.fill(0);
                }
                p.square(i, j, Cell.dim);
            }
        }

        this.iter++;
        if (this.iter == 100) {
            this.pause();
            Game.app.setPage(Game.app.Pages.MAIN_MENU);
            this.update = this.#startup;
        }
    }

    #startup(p) {
        console.log("Starting up...");
        this.iter = 0;
        this.update = this.#refresh;
    }

    pause(p) {
        return;
    }

    static app = null;
}