import App from "../App.js"
import Cell from "./Cell.js"

const AMBIENT = 0.05;

export default class Node {
    static Types = {
        WALL : {
            colors : [
                {r:0, g:0, b:0}, // Darkest
                {r:20, g:20, b:20}, // Medium
                {r:40, g:40, b:40}, // Lighest
            ],
            id : 0
        },
        PATH : {
            colors : [
                {r:255, g:255, b:255}, // Darkest
                {r: 235, g:235, b:235}, // Medium
                {r:215, g:215, b:215}, // Lightest
            ],
            id : 1
        }, 
        DEBUG : {
            colors : [
                {r:0, g:255, b:0}
            ],
            id : 2
        }
    };
    
    constructor(pos) {
        this.pos = Object.assign({}, pos);
        this.cell = new Cell(pos.x * Cell.dim, pos.y * Cell.dim, null, Cell.dim, Cell.dim);
        this.entities = new Set();
        this.intensity = AMBIENT;
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
    }

    setType(type) {
        this.type = type;
        this.cell.setColor(this.type.colors[Math.floor(Math.random() * this.type.colors.length)]);
    }

    getType() {
        return this.type;
    }

    reset() {
        this.setType(Node.Types.WALL);
        this.entities.clear();
        this.intensity = AMBIENT;
    }
}