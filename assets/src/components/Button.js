import Cell from "./Cell.js"

const TEXT_SIZE = 26;
const TEXT_WEIGHT = 1;
const PADDING = 8;
const STATES = {HOVER : 0, DEFAULT : 1};

export default class Button {
    constructor(p, data) {
        p.textSize(TEXT_SIZE);
        p.strokeWeight(TEXT_WEIGHT);
        data.width = p.textWidth(data.text);
        data.height = p.textAscent() + p.textDescent();
        this.backdrop = new Cell(
            data.x - ((data.width + PADDING) / 2),
            data.y - (data.height / 2),
            data.width + PADDING,
            data.height + PADDING,
            data.default
        );
        this.data = data;
        this.state = STATES.DEFAULT;
    }

    update(p) {
        this.#updateState(p);
    }

    draw(p) {
        this.backdrop.draw(p);

        p.rectMode(p.CENTER);
        p.textSize(TEXT_SIZE);
        p.noStroke();
        p.fill(0);
        p.text(this.data.text, this.data.x, this.data.y);
    }

    #updateState(p) {
        const x = this.data.x - ((this.data.width + PADDING) / 2);
        const y = this.data.y - (this.data.height / 2);
        let curState = (
            p.mouseX <= x || 
            p.mouseY <= y || 
            p.mouseX >= x + this.data.width + PADDING ||
            p.mouseY >= y + this.data.height + PADDING
        )? STATES.DEFAULT : STATES.HOVER; 
        if (curState != this.state) {
            this.backdrop.setColor((curState == STATES.HOVER)? this.data.hover : this.data.default);
            this.state = curState;
        }
    }
}