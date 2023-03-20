import { App } from "../App.js"
import Button from "./Button.js"

export default class MainMenu {
    constructor(app) {
        this.update = this.#startup;
    }

    reset(p) {

    }

    init(p, app) {
        PLAY_BTN.x = app.WIDTH / 2;
        PLAY_BTN.y = app.HEIGHT / 2;
        this.playBtn = new Button(p, PLAY_BTN);
    }

    #refresh(p, app, deltaTime) {
        p.background(0, 0, 0);
        this.playBtn.update(p);

        this.#drawUI(p, app);
    }

    #startup(p) {
        this.update = this.#refresh;
    }

    #pause(p) {
        return;
    }

    #drawUI(p, app) {
        p.rectMode(p.CENTER);
        p.textSize(50);
        p.strokeWeight(3);
        p.stroke(255);
        p.fill(0);
        p.text("L A B Y R I N T H", app.WIDTH / 2, app.HEIGHT / 3, app.WIDTH);

        this.playBtn.draw(p);
    }

    static playCallback = function() {
        console.log("Pressed play button.");
    }
}

const PLAY_BTN = {
    x : null,
    y : null,
    text : "Play",
    default : {
        r : 255,
        g : 255,
        b : 255
    },
    hover : {
        r : 155,
        g : 155,
        b : 155,
    },
    callback : MainMenu.playCallback
}