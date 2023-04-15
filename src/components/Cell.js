import App from "../App.js"

export default class Cell {
    static dim = 25;

    constructor(x, y, color, width=Cell.dim, height=Cell.dim) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(intensity = 1) {
        App.canvas.rectMode(App.canvas.CORNER);
        App.canvas.noStroke();
        App.canvas.fill(this.color.r * intensity, this.color.g * intensity, this.color.b * intensity);
        App.canvas.rect(this.x, this.y, this.width, this.height);
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}