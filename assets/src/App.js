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
        this.Pages = {MAIN_MENU : new MainMenu(this), GAME : new Game(this)};
        this.curPage = this.Pages.MAIN_MENU;
    }

    setPage(page) {
        this.curPage = page;
    }

    init(p) {
        this.Pages.MAIN_MENU.init(p);
        this.Pages.GAME.init(p);
    }
}

export default function init(p) {
    const app = new App();

    p.preload = function() {
        app.font = p.loadFont("./assets/font/PixeloidSans.ttf");
    }

    p.setup = function() {
        let dimensions = getDimensions();
        app.DIM_X = dimensions.X;
        app.DIM_Y = dimensions.Y;
        app.WIDTH = dimensions.X * Cell.dim;
        app.HEIGHT = dimensions.Y * Cell.dim;
        p.createCanvas(
            app.WIDTH,
            app.HEIGHT,
            p.P2D
        );
        
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont(app.font);
        p.frameRate(App.FPS);
        app.init(p);
    }

    p.draw = function() {
        app.curPage.update(p);
    }
}