import Cell from "./Cell.js"
import { App } from "../App.js"

export default class Game {
    constructor() {
        this.iter = 0;
    }

    update(p, app, deltaTime) {
        p.clear();
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
            this.iter = 0;
            app.setPage(app.Pages.MAIN_MENU);
        }
    }

    reset(p) {

    }
}