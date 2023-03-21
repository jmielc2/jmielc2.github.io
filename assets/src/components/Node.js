import Cell from "./Cell.js"

export default class Node {
    constructor(x, y, color) {
        this.cell = new Cell(x * Cell.dim, y * Cell.dim, color, Cell.dim, Cell.dim);
    }

    draw(p) {
        this.cell.draw(p);
    }
}