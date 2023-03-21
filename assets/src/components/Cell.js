export default class Cell {
    static dim = 30;

    constructor(x, y, color, width=Cell.dim, height=Cell.dim) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setColor(color);
    }

    draw(p) {
        p.rectMode(p.CORNER);
        p.stroke(255);
        p.strokeWeight(1);
        p.fill(this.color.r, this.color.g, this.color.b);
        p.rect(this.x, this.y, this.width, this.height);
    }

    setColor(color) {
        this.color = color;
    }
}