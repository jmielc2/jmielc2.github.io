
import App from "../App.js"
import Cell from "./Cell.js"
import Button from "./Button.js"

const PLAY_BTN = {
    x : null,
    y : null,
    width : 4 * Cell.dim,
    height : 1.25 * Cell.dim,
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
    callback : null
}

export default class MainMenu {
    constructor(app) {
        MainMenu.app = app;
        PLAY_BTN.callback = this.playBtnCallback;
        this.update = this.startup;
    }

    reset() {

    }

    init() {
        PLAY_BTN.x = (PLAY_BTN.x)? PLAY_BTN.x : App.WIDTH / 2;
        PLAY_BTN.y = (PLAY_BTN.y)? PLAY_BTN.y : App.HEIGHT / 2;
        this.playBtn = new Button(PLAY_BTN);
    }

    #refresh() {
        App.canvas.clear();
        App.canvas.background(0, 0, 0);
        this.playBtn.update(MainMenu.app);

        this.#drawUI();
    }

    startup() {
        this.update = this.#refresh;
    }

    pause() {
        this.update = this.startup;
    }

    #drawUI() {
        App.canvas.rectMode(App.canvas.CENTER);
        App.canvas.textSize(50);
        App.canvas.strokeWeight(3);
        App.canvas.stroke(255);
        App.canvas.fill(0);
        App.canvas.text(
            "L A B Y R I N T H",
            App.WIDTH / 2,
            App.HEIGHT / 3,
            App.WIDTH
        );

        this.playBtn.draw();
    }

    static app = null;

    playBtnCallback = (function() {
        MainMenu.app.setPage(MainMenu.app.Pages.GAME);
    }).bind(this);
}