import App from "../App.js"
import Node from "./Node.js"
import { Directions, NUM_DIRS } from "../pages/Game.js"
import { isValidPos } from "./utils/GameUtils.js";

export default class Grid {
    constructor() {
        this.grid = Array(App.DIM_Y).fill(0).map((x) => Array(App.DIM_X).fill(0));
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                const pos = {x:j, y:i};
                this.grid[i][j] = new Node(pos);
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

    addEntity(entity) {
        return this.grid[entity.pos.y][entity.pos.x].addEntity(entity);
    }

    removeEntity(entity) {
        return this.grid[entity.pos.y][entity.pos.x].removeEntity(entity);
    }

    moveEntity(entity, dir) {
        const next = entity.calcMove(dir);
        if (this.isAccessible(next)) {
            this.removeEntity(entity);
            entity.move(dir);
            this.addEntity(entity);
            return true;
        }
        return false;
    }

    getEntities(pos) {
        return this.grid[pos.y][pos.x].entities;
    }

    draw() {
        App.canvas.rectMode(App.canvas.CORNER);
        this.grid.forEach((row) => {
            row.forEach((node) => {
                node.draw();
            });
        });
    }

    isAccessible(pos) {
        return (isValidPos(pos, this.grid) && this.getNodeType(pos) == Node.Types.PATH);
    }
}