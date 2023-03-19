import Cell from "./Cell.js"
import { App } from "../App.js"

export default class MainMenu {
    constructor() {
        this.iter = 0;
        this.update = this.startup;
    }

    refresh(p, app, deltaTime) {
        p.background(100, 50, 150);

        this.iter++;
        if (this.iter == 100) {
            this.pause(p);
            app.setPage(app.Pages.GAME);
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