import Cell from "./components/Cell.js"
import MainMenu from "./components/MainMenu.js"
import Game from "./components/Game.js"


function getDimensions() {
    let x = Math.min(
        Math.round((window.innerWidth - Cell.dim) / Cell.dim),
        App.MAX_DIM_X
    );
    x -= ((x - 3) & 1);
    let y = Math.min(
        Math.round((window.innerHeight - Cell.dim) / Cell.dim),
        App.MAX_DIM_Y
    );
    y -= ((y - 3) & 1);
    return {X : x, Y : y};
}

export class App {
    static MAX_DIM_X = 37;
    static MAX_DIM_Y = 27;
    static FPS = 30;
    static canvas = null;

    constructor(canvas) {
        App.canvas = canvas;
        this.Pages = {MAIN_MENU : new MainMenu(this), GAME : new Game(this)};
        this.curPage = this.Pages.MAIN_MENU;
    }

    setPage(page) {
        this.curPage.pause();
        this.curPage.update = this.curPage.startup;
        this.curPage = page;
    }

    init() {
        this.Pages.MAIN_MENU.init();
        this.Pages.GAME.init();
    }
}

export default function init(canvas) {
    const app = new App(canvas);

    canvas.preload = function() {
        app.font = canvas.loadFont("./assets/font/PixeloidSans.ttf");
    }

    canvas.setup = function() {
        let dimensions = getDimensions();
        App.DIM_X = dimensions.X;
        App.DIM_Y = dimensions.Y;
        App.WIDTH = dimensions.X * Cell.dim;
        App.HEIGHT = dimensions.Y * Cell.dim;
        canvas.createCanvas(
            App.WIDTH,
            App.HEIGHT,
            canvas.P2D
        );
        
        canvas.textAlign(canvas.CENTER, canvas.CENTER);
        canvas.textFont(app.font);
        canvas.frameRate(App.FPS);
        app.init();
    }

    canvas.draw = function() {
        app.curPage.update();
    }
}