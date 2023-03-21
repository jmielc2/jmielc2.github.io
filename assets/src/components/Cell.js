export default class Cell {
    static dim = 35;

    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setColor(color);
    }

    draw(p) {
        p.rectMode(p.CORNER);
        p.noStroke();
        p.fill(this.color.r, this.color.g, this.color.b);
        p.rect(this.x, this.y, this.width, this.height);
    }

    setColor(color) {
        this.color = color;
    }
}