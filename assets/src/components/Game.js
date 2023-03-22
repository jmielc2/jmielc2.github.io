import Node from "./Node.js"
import Grid from "./Grid.js"
import { generateMaze } from "./utils/MazeUtils.js"
import { getDistance } from "./utils/GameUtils.js"
import Entity from "./Entity.js"
import Player from "./Player.js"
import Enemy from "./Enemy.js"
import { App } from "../App.js"

export const UP = 0;
export const RIGHT = 1;
export const DOWN = 2;
export const LEFT = 3;
export const NUM_DIRS = 4;
export const Directions = [
    { x:0, y:-1, key:null },
    { x:1, y:0, key:null },
    { x:0, y:1, key:null },
    { x:-1, y:0, key:null }
]

export const BOUNDARY_POINTS = [];

export default class Game {
    static Difficulty = [50, 70, 90];

    constructor(app) {
        Game.app = app;
        Directions[UP].key = App.canvas.UP_ARROW;
        Directions[RIGHT].key = App.canvas.RIGHT_ARROW;
        Directions[DOWN].key = App.canvas.DOWN_ARROW;
        Directions[LEFT].key = App.canvas.LEFT_ARROW;
        this.update = this.startup;
        this.level = 0;
        this.entities = new Set();
    }

    reset() {
        this.entities.clear();
        this.grid.reset();
        let difficulty = Game.Difficulty[(this.level < Game.Difficulty.length)? this.level : Game.Difficulty.length - 1]
        
        let mazeData = null;
        let i = 0;
        do {
            mazeData = generateMaze(this.grid.grid, difficulty);
            i++;
        } while (i < 3 && getDistance(mazeData.start, mazeData.enemy) < 6);
        if (mazeData.start.x != 0 && mazeData.start.x != App.DIM_X - 1){
            console.log(mazeData.start.x);
            console.log(BOUNDARY_POINTS);
        }
        this.initPlayer(difficulty, mazeData.start);
        this.initExit(difficulty, mazeData.end);
        this.initEnemy(difficulty, mazeData.enemy);
    }

    init() {
        this.grid = new Grid();
        let yOffset = Math.round((App.DIM_Y - 3) / 3)
        yOffset = (yOffset & 1)? yOffset : yOffset - 1;
        BOUNDARY_POINTS.push(
            {x:0, y:yOffset},
            {x:App.DIM_X - 1, y:yOffset},
            {x:0, y:App.DIM_Y - 1 - yOffset},
            {x:App.DIM_X - 1, y:App.DIM_Y - 1 - yOffset}
        );
    }

    #refresh() {
        // Update Enemy
        // Update Player
        this.player.update(App.canvas.deltaTime);
        // Recalculate Node Light Vals

        App.canvas.clear();
        this.grid.draw();
    }

    startup() {
        this.reset();
        this.level = 0;
        this.update = this.#refresh;
    }

    pause() {
        this.update = this.startup;
    }

    initPlayer(difficulty, pos) {
        this.player = new Player(this, pos);
        this.entities.add(this.player);
        this.grid.setNodeType(pos, Node.Types.PLAYER);
    }
    
    initExit(difficulty, pos) {
        this.entities.add(new Entity(pos))
        this.grid.setNodeType(pos, Node.Types.EXIT);
    }
    
    initEnemy(difficulty, pos) {
        this.enemy = new Enemy(this, pos);
        this.entities.add(this.enemy);
        this.grid.setNodeType(pos, Node.Types.ENEMY);
    }

    nextLevel() {
        this.level++;
        if (this) {
            Game.app.setPage(Game.app.Pages.MAIN_MENU);
        }
    }

    static app = null;
}

