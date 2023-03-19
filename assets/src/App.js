import Cell from "./components/Cell.js"
import MainMenu from "./components/MainMenu.js"
import Game from "./components/Game.js"

function getDimensions() {
    let x = Math.min(
        Math.round((window.innerWidth - Cell.dim) / Cell.dim),
        App.MAX_DIM_X
    );
    x -= ((x - 3) % 2);
    let y = Math.min(
        Math.round((window.innerHeight - Cell.dim) / Cell.dim),
        App.MAX_DIM_Y
    );
    y -= ((y - 3) % 2);
    return {X : x, Y : y};
}

export class App {
    static MAX_DIM_X = 33;
    static MAX_DIM_Y = 23;
    static FPS = 24;

    constructor() {
        this.Pages = {MAIN_MENU : new MainMenu(), GAME : new Game()};
        this.curPage = this.Pages.MAIN_MENU;
        this.lastUpdate = Date.now();
    }

    setPage(page) {
        this.curPage = page;
    }
}

export default function init(p) {
    const app = new App();
    app.canvas = p;

    p.setup = function() {
        let dimensions = getDimensions();
        app.WIDTH = dimensions.X * Cell.dim;
        app.HEIGHT = dimensions.Y * Cell.dim;
        p.createCanvas(
            app.WIDTH,
            app.HEIGHT,
            p.P2D
        );
        p.frameRate(App.FPS);
    }

    p.draw = function() {
        const time = Date.now();
        app.curPage.update(p, app, time - this.lastUpdate);
        this.lastUpdate = time;
    }
}