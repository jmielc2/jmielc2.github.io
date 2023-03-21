import Cell from "./Cell.js"

const TEXT_SIZE = 26;
const PADDING = 8;
const States = {HOVER : 0, DEFAULT : 1};

export default class Button {
    constructor(p, data) {
        p.textSize(TEXT_SIZE);
        p.noStroke();
        data.width = (data.width)? data.width : p.textWidth(data.text) + PADDING;
        data.height = (data.height)? data.height : p.textAscent() + p.textDescent();
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

    update(p) {
        this.#updateState(p);
        if (p.mouseIsPressed && this.state == States.HOVER) {
            this.data.callback(p);
        }
    }

    draw(p) {
        this.backdrop.draw(p);

        p.rectMode(p.CENTER);
        p.textSize(TEXT_SIZE);
        p.noStroke();
        p.fill(0);
        p.text(this.data.text, this.data.x, this.data.y);
    }

    #updateState(p, app) {
        const x = this.data.x - (this.data.width / 2);
        const y = this.data.y - (this.data.height / 2);
        let curState = (
            p.mouseX <= x || 
            p.mouseY <= y || 
            p.mouseX >= x + this.data.width ||
            p.mouseY >= y + this.data.height
        )? States.DEFAULT : States.HOVER; 
        if (curState != this.state) {
            this.backdrop.setColor((curState == States.HOVER)? this.data.hover : this.data.default);
            this.state = curState;
        }
    }
}