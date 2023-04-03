import App from "../App.js"
import Cell from "./Cell.js"

const TEXT_SIZE = 26;
const PADDING = 8;
const States = {HOVER : 0, DEFAULT : 1};

export default class Button {
    constructor(data) {
        App.canvas.textSize(TEXT_SIZE);
        App.canvas.noStroke();
        data.width = (data.width)? data.width : App.canvas.textWidth(data.text) + PADDING;
        data.height = (data.height)? data.height : App.canvas.textAscent() + App.canvas.textDescent();
        this.backdrop = new Cell(
            data.x - (data.width / 2),
            data.y - (data.height / 2) + (PADDING / 1.5),
            data.default,
            data.width,
            data.height
        );
        this.data = data;
        this.state = States.DEFAULT;
    }

    update() {
        this.#updateState();
        if (App.canvas.mouseIsPressed && this.state == States.HOVER) {
            this.data.callback();
        }
    }

    draw() {
        this.backdrop.draw();

        App.canvas.rectMode(App.canvas.CENTER);
        App.canvas.textSize(TEXT_SIZE);
        App.canvas.noStroke();
        App.canvas.fill(0);
        App.canvas.text(this.data.text, this.data.x, this.data.y);
    }

    #updateState(app) {
        const x = this.data.x - (this.data.width / 2);
        const y = this.data.y - (this.data.height / 2);
        let curState = (
            App.canvas.mouseX <= x || 
            App.canvas.mouseY <= y || 
            App.canvas.mouseX >= x + this.data.width ||
            App.canvas.mouseY >= y + this.data.height
        )? States.DEFAULT : States.HOVER; 
        if (curState != this.state) {
            this.backdrop.setColor((curState == States.HOVER)? this.data.hover : this.data.default);
            this.state = curState;
        }
    }
}