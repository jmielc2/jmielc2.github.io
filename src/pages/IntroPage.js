import App from "../App.js"

export default class IntroPage {
    constructor(app) {
        IntroPage.app = app;
        this.update = this.startup;
    }

    init() {
        IntroPage.elements.text.forEach((element) => {
            element.x = App.WIDTH / 2;
            element.y = App.HEIGHT / 2;
        });
    }

    reset() {

    }

    startup() {
        this.timer = 0;
        this.index = 0;
        IntroPage.elements.text.forEach((element) => {
            element.x = App.WIDTH / 2;
            element.y = App.HEIGHT / 2 - element.size;
            element.show = false;
        });
        this.update = this.#refresh;
    }

    pause() {
        this.update = this.startup;
    }

    #refresh() {
        this.timer += App.canvas.deltaTime;
        App.canvas.clear();
        App.canvas.background(0, 0, 0);

        App.canvas.rectMode(App.canvas.CENTER);
        App.canvas.strokeWeight(3);
        App.canvas.stroke(255);
        App.canvas.fill(0);
        IntroPage.elements.text.forEach((element) => {
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
        const time = Math.max(IntroPage.elements.text[this.index].text.length * 90, 2000);
        if ((this.index == 0 && this.timer > 250) || this.timer > time) {
            IntroPage.elements.text[this.index].show = false;
            this.index++;
            if (this.index == IntroPage.elements.text.length) {
                IntroPage.app.setPage(IntroPage.app.Pages.GAME);
            } else {
                IntroPage.elements.text[this.index].show = true;
            }
            this.timer = 0;
        }
    }

    setSubText(text) {
        IntroPage.elements.text[1].text = text;
    }

    static #playAgainCallback() {
        IntroPage.app.setPage(IntroPage.app.Pages.GAME);
    }

    static app;

    static elements = {
        text : [
            {
                x : null,
                y : null,
                size : 30,
                text : "",
                show : false,
            },
            {
                x : null,
                y : null,
                size : 25,
                text : "After decades of human sacrifices, King Minos once again offers\nto release Theseus and his people from their contract.",
                show : false
            },
            {
                x : null,
                y : null,
                size : 35,
                text : "His one condition...?",
                show : false
            },
            {
                x : null,
                y : null,
                size : 30,
                text : "Theseus must first escape the Labyrinth of King Minos alive!",
                show : false
            },
            {
                x : null,
                y : null,
                size : 30,
                text : "Though many have tried, the maze and its monsters have yet to be survived.",
                show : false
            },
            {
                x : null,
                y : null,
                size : 35,
                text : "But Theseus is no ordinary man...",
                show : false
            },
            {
                x : null,
                y : null,
                size : 30,
                text : "He is a great hero of ancient Greece!\nSurviving challenges is what he lives for!",
                show : false
            },
            {
                x : null,
                y : null,
                size : 35,
                text : "Use the arrow keys to move Theseus around.",
                show : false,
            },
            {
                x : null,
                y : null,
                size : 25,
                text : "Princess Ariadne has hidden a glowing thread to assist your escape.\nFind it to help light the way!",
                show : false,
            },
            {
                x : null,
                y : null,
                size : 30,
                text : "And watch out for those Minotaurs!\nGetting cornered means almost certain death",
                show : false,
            },
            {
                x : null,
                y : null,
                size : 30,
                text : "Good Luck!",
                show : false,
            },
        ]
    }
}