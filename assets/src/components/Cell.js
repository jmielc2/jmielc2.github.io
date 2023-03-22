import { App } from "../App.js"

export default class Cell {
    static dim = 25;

    constructor(x, y, color, width=Cell.dim, height=Cell.dim) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setColor(color);
    }

    draw() {
        App.canvas.rectMode(App.canvas.CORNER);
        App.canvas.noStroke();
        // App.canvas.stroke(255,0,0);  // For Debugging
        // App.canvas.strokeWeight(1);
        App.canvas.fill(this.color.r, this.color.g, this.color.b);
        App.canvas.rect(this.x, this.y, this.width, this.height);
    }

    setColor(color) {
        this.color = color;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}