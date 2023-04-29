import App from "../App.js"
import Cell from "../components/Cell.js"
import Button from "../components/Button.js"

export default class EndPage {
    constructor(app) {
        EndPage.app = app;
        this.update = this.startup;
    }

    init() {
        EndPage.elements.text[0].x = App.WIDTH / 2;
        EndPage.elements.text[0].y = App.HEIGHT / 3;
        EndPage.elements.text[1].x = App.WIDTH / 2;
        EndPage.elements.text[1].y = App.HEIGHT / 2;
        EndPage.elements.buttons[0].x = App.WIDTH / 2;
        EndPage.elements.buttons[0].y = App.HEIGHT * (2/3);
        EndPage.elements.buttons[0].button = new Button(EndPage.elements.buttons[0]);
    }

    reset() {

    }

    startup() {
        this.timer = 0;
        EndPage.elements.text[1].show = false;
        EndPage.elements.buttons[0].show = false;
        this.update = this.#refresh;
    }

    pause() {
        this.update = this.startup;
    }

    #refresh() {
        this.timer += App.canvas.deltaTime;
        App.canvas.clear();
        App.canvas.background(0, 0, 0);
        EndPage.elements.buttons.forEach((button) => {
            if (button.show) {
                button.button.update(EndPage.app);
                button.button.draw();
            }
        });

        App.canvas.rectMode(App.canvas.CENTER);
        App.canvas.strokeWeight(3);
        App.canvas.stroke(255);
        App.canvas.fill(0);
        EndPage.elements.text.forEach((element) => {
            if (element.show) {
                App.canvas.textSize(element.size);
                App.canvas.text(
                    element.text,
                    element.x,
                    element.y,
                    App.WIDTH
                );
            }
        });

        if (this.timer > 2000) {
            EndPage.elements.text[1].show = true;
        }
        if (this.timer > 4000) {
            EndPage.elements.buttons[0].show = true;
        }
    }

    setSubText(text) {
        EndPage.elements.text[1].text = text;
    }

    static #playAgainCallback() {
        EndPage.app.setPage(EndPage.app.Pages.GAME);
    }

    static app;

    static elements = {
        buttons : [
            {
                button : null,
                x : null,
                y : null,
                width : 7 * Cell.dim,
                height : 1.25 * Cell.dim,
                text : "Play Again",
                default : {
                    r : 255,
                    g : 255,
                    b : 255
                },
                hover : {
                    r : 155,
                    g : 155,
                    b : 155
                },
                callback : EndPage.#playAgainCallback,
                show : false
            },
        ],
        text : [
            {
                x : null,
                y : null,
                size : 35,
                text : "Congrats, you've escaped\nThe Labyrinth!",
                show : true
            },
            {
                x : null,
                y : null,
                size : 20,
                text : "",
                show : false,
            }
        ]
    }
}