import App from "../App.js"
import Cell from "./Cell.js"

const WALL_COLOR = {r:0, g:0, b:0};
const GROUND_COLOR = {r:255, g:255, b:255};
const DEBUG_COLOR = {r:0, g:255, b:0};

export default class Node {
    static Types = {
        WALL : {
            color : WALL_COLOR
        },
        PATH : {
            color : GROUND_COLOR
        },
        DEBUG : {
            color : DEBUG_COLOR
        }
    };
    
    constructor(pos) {
        this.pos = Object.assign({}, pos);
        this.cell = new Cell(pos.x * Cell.dim, pos.y * Cell.dim, null, Cell.dim, Cell.dim);
        this.entities = new Set();
        this.reset();
    }

    addEntity(entity) {
        return this.entities.add(entity);
    }

    removeEntity(entity) {
        return this.entities.delete(entity);
    }

    hasEntity(entity) {
        return this.entities.has(entity);
    }

    draw() {
        this.cell.draw();
        this.entities.forEach((entity) => {
            entity.draw();
        });
    }

    setType(type) {
        this.type = type;
        this.cell.setColor(this.type.color);
    }

    getType() {
        return this.type;
    }

    reset() {
        this.setType(Node.Types.WALL);
        this.entities.clear();
    }
}