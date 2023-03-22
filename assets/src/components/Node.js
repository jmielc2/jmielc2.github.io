import Cell from "./Cell.js"

const WALL_COLOR = {r:0, g:0, b:0};
const GROUND_COLOR = {r:255, g:255, b:255};
const PLAYER_COLOR = {r:0, g:0, b:255};
const ENEMY_COLOR = {r:255, g:0, b:0};
const DEBUG_COLOR = {r:0, g:255, b:0};

export default class Node {
    static Type = {
        WALL : {
            id:0,
            color : WALL_COLOR
        },
        PATH : {
            id:1,
            color : GROUND_COLOR
        },
        PLAYER : {
            id:2, 
            color : PLAYER_COLOR
        },
        ENEMY : {
            id:3,
            color : ENEMY_COLOR
        },
        EXIT : {
            id:4,
            color : DEBUG_COLOR
        },
        DEBUG : {
            id:null,
            color : DEBUG_COLOR
        }
    };
    
    constructor(x, y) {
        this.cell = new Cell(x * Cell.dim, y * Cell.dim, null, Cell.dim, Cell.dim);
        this.reset();
    }

    draw(p) {
        this.cell.draw(p);
    }

    setType(type) {
        this.type = type;
        this.cell.setColor(this.type.color);
    }

    getType() {
        return this.type;
    }

    reset() {
        this.setType(Node.Type.WALL);
    }
}