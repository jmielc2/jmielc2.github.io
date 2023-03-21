import Cell from "./Cell.js"
import { App } from "../App.js"

export default class Game {
    constructor(app) {
        Game.app = app;
        this.update = this.startup;
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

        if (p.mouseIsPressed) {
            Game.app.setPage(Game.app.Pages.MAIN_MENU);
        }
    }

    startup(p) {
        this.update = this.#refresh;
    }

    pause(p) {
        this.update = this.startup;
    }

    static app = null;
}