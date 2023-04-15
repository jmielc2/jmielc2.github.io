// import App from "../App.js"
import Cell from "./Cell.js"

const AMBIENT = 0.07;

export default class Node {
    static Types = {
        WALL : {
            colors : [
                {r:105, g:61, b:48}, // Darkest
                {r:90, g:65, b:40}, // Medium
                {r:95, g:60, b:20}, // Lighest
            ],
            id : 0
        },
        PATH : {
            colors : [
                {r:245, g:240, b:220}, // Lightest
                {r: 255, g:245, b:205}, // Medium
                {r:255, g:235, b:180}, // Darkest
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
        this.cell.draw(this.intensity);
    }

    setType(type) {
        this.type = type;
        this.cell.setColor(this.type.colors[Math.floor(Math.random() * this.type.colors.length)]);
    }

    getType() {
        return this.type;
    }

    setIntensity(val = AMBIENT) {
        this.intensity = val;
    }

    getIntensity() {
        return this.intensity;
    }

    reset() {
        this.setType(Node.Types.WALL);
        this.entities.clear();
        this.setIntensity(AMBIENT);
    }
}