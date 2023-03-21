import Node from "./Node.js"
import { generateMaze } from "./utils/MazeUtils.js"

export const Directions = {
    UP : 0,
    RIGHT : 1,
    DOWN : 2,
    LEFT : 3,
    NUM : 4,
    Dirs : [
        { x:0, y:1 },
        { x:1, y:0 },
        { x:0, y:-1},
        { x:-1, y:0}
    ]
};

export const BOUNDARY_POINTS = [];

export default class Game {
    static Difficulty = [50, 70, 90];

    constructor(app) {
        Game.app = app;
        this.update = this.startup;
        this.iter = 0;
    }

    reset(p) {
        this.grid.forEach((row) => {
            row.forEach((node) => {
                node.reset();
            })
        })
        let difficulty = Game.Difficulty[(this.iter < Game.Difficulty.length)? this.iter : Game.Difficulty.length - 1]
        generateMaze(this, difficulty);
    }

    init(p) {
        this.grid = Array(Game.app.DIM_Y).fill(0).map((x) => Array(Game.app.DIM_X).fill(0));
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                this.grid[i][j] = new Node(j, i);
            }
        }
        let yOffset = Math.round((Game.app.DIM_Y - 3) / 3)
        yOffset = (yOffset % 2)? yOffset : yOffset - 1;
        BOUNDARY_POINTS.push(
            {x:0, y:yOffset},
            {x:Game.app.DIM_X - 1, y:yOffset},
            {x:0, y:Game.app.DIM_Y - 1 - yOffset},
            {x:Game.app.DIM_X - 1, y:Game.app.DIM_Y - 1 - yOffset}
        );
    }

    #refresh(p) {
        p.clear();
        p.rectMode(p.CORNER);
        this.grid.forEach((row) => {
            row.forEach((node) => {
                node.draw(p);
            });
        });

        if (p.mouseIsPressed) {
            this.reset();
        }
    }

    startup(p) {
        this.reset();
        this.update = this.#refresh;
    }

    pause(p) {
        this.update = this.startup;
    }

    setPlayerPos(x, y) {
        this.grid[y][x].setType(Node.Type.PLAYER);
    }

    setExitPos(x, y) {
        this.grid[y][x].setType(Node.Type.EXIT);
    }

    static app = null;
}

