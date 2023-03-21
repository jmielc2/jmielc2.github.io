
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

    reset(p) {

    }

    init(p) {
        PLAY_BTN.x = (PLAY_BTN.x)? PLAY_BTN.x : MainMenu.app.WIDTH / 2;
        PLAY_BTN.y = (PLAY_BTN.y)? PLAY_BTN.y : MainMenu.app.HEIGHT / 2;
        this.playBtn = new Button(p, PLAY_BTN);
    }

    #refresh(p) {
        p.clear();
        p.background(0, 0, 0);
        this.playBtn.update(p, MainMenu.app);

        this.#drawUI(p, MainMenu.app);
    }

    startup(p) {
        this.update = this.#refresh;
    }

    pause(p) {
        this.update = this.startup;
    }

    #drawUI(p) {
        p.rectMode(p.CENTER);
        p.textSize(50);
        p.strokeWeight(3);
        p.stroke(255);
        p.fill(0);
        p.text(
            "L A B Y R I N T H",
            MainMenu.app.WIDTH / 2,
            MainMenu.app.HEIGHT / 3,
            MainMenu.app.WIDTH
        );

        this.playBtn.draw(p);
    }

    static app = null;

    playBtnCallback = (function(p) {
        MainMenu.app.setPage(MainMenu.app.Pages.GAME);
    }).bind(this);
}