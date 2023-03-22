import { App } from "../App.js"
import Node from "./Node.js"
import { isValidPos } from "./utils/GameUtils.js";

export default class Grid {
    constructor() {
        this.grid = Array(App.DIM_Y).fill(0).map((x) => Array(App.DIM_X).fill(0));
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                this.grid[i][j] = new Node(j, i);
            }
        }
    }

    reset() {
        this.grid.forEach((row) => {
            row.forEach((node) => {
                node.reset();
            })
        })
    }

    setNodeType(pos, type) {
        this.grid[pos.y][pos.x].setType(type);
    }

    getNodeType(pos) {
        return this.grid[pos.y][pos.x].getType();
    }

    draw() {
        App.canvas.rectMode(App.canvas.CORNER);
        this.grid.forEach((row) => {
            row.forEach((node) => {
                node.draw(App.canvas);
            });
        });
    }

    isValidPos(pos) {
        return isValidPos(pos, this.grid);
    }
}