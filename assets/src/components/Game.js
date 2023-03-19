import Cell from "./Cell.js"
import { App } from "../App.js"

export default class Game {
    constructor() {
        this.iter = 0;
        this.update = this.startup;
    }

    refresh(p, app, deltaTime) {
        for (let i = 0; i < app.WIDTH; i += Cell.dim) {
            for (let j = 0; j < app.HEIGHT; j += Cell.dim) {
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
            app.setPage(app.Pages.MAIN_MENU);
            this.update = this.startup;
        }
    }

    reset(p) {

    }

    startup(p) {
        this.iter = 0;
        this.update = this.refresh;
    }

    pause(p) {
        return;
    }
}