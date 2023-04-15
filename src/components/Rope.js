import App from "../App.js"
import Cell from "./Cell.js"
import Entity from "./Entity.js"

const THICKNESS = 2;
const COLOR = {r:210, g:175, b:55}

class Ring {
    constructor(pos) {
        this.pos = pos;
        this.xOffset = Math.floor(Math.random() * 3) * ((Math.random() > 0.5)? 1 : -1);
        this.yOffset = Math.floor(Math.random() * 3) * ((Math.random() > 0.5)? 1 : -1);
        this.x = Math.floor(Math.random() * 3);
        this.y = Math.floor(Math.random() * 3);
    }

    draw() {
        App.canvas.ellipse(
            this.pos.x * Cell.dim + this.xOffset + (Cell.dim / 2),
            this.pos.y * Cell.dim + this.yOffset + (Cell.dim / 2),
            Cell.dim * 0.6 + this.x,
            Cell.dim * 0.6 + this.y
        )
    }
}

export default class Rope extends Entity {

    constructor(game, pos) {
        super(Entity.Types.ROPE);
        this.setPos(pos);
        this.rings = new Array();
        Rope.game = game;
        for (let i = 0; i < 5; i++) {
            this.rings.push(new Ring(this.pos));
        }
    }

    update(deltaTime) {
        this.drawSpotlight(Rope.game.grid, 2, 0.2);
    }

    draw() {
        App.canvas.noFill();
        App.canvas.stroke(COLOR.r, COLOR.g, COLOR.b);
        App.canvas.strokeWeight(THICKNESS);
        App.canvas.ellipseMode(App.canvas.CENTER);
        this.rings.forEach((ring) => {
            ring.draw();
        });
    }

    static game;
}