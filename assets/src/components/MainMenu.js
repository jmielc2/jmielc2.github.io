import Cell from "./Cell.js"
import { App } from "../App.js"

export default class MainMenu {
    constructor() {
        this.iter = 0;
    }

    update(p, app, deltaTime) {
        p.clear();
        p.background(100, 50, 150);

        this.iter++;
        if (this.iter == 100) {
            this.iter = 0;
            app.setPage(app.Pages.GAME);
        }
    }

    reset(p) {

    }
}