import Cell from "./Cell.js"
import Node from "./Node.js"
import { App } from "../App.js"

export default class Game {
    constructor(app) {
        Game.app = app;
        this.update = this.startup;
    }

    reset(p) {

    }

    init(p) {
        this.grid = Array(Game.app.DIM_Y).fill(0).map(x => Array(Game.app.DIM_X).fill(0));
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                let color;
                if ((j % 2) || (i % 2)) {
                    color = {r : 255, g : 255, b : 255};
                } else {
                    color = {r : 0, g : 0, b : 0};
                }
                this.grid[i][j] = new Node(j, i, color);
            }
        }
    }

    #refresh(p) {
        p.clear();
        p.rectMode(p.CORNER);
        this.grid.forEach((row) => {
            row.forEach((node) => {
                node.draw(p);
            });
        });
    }

    startup(p) {
        this.update = this.#refresh;
    }

    pause(p) {
        this.update = this.startup;
    }

    static app = null;
}