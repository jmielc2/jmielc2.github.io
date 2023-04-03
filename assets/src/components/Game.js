import Node from "./Node.js"
import Grid from "./Grid.js"
import { generateMaze } from "./utils/MazeUtils.js"
import { getDistance } from "./utils/GameUtils.js"
import Entity from "./Entity.js"
import Player from "./Player.js"
import Enemy from "./Enemy.js"
import App from "../App.js"

export const UP = 0;
export const RIGHT = 1;
export const DOWN = 2;
export const LEFT = 3;
export const NUM_DIRS = 4;
export const Directions = [
    { x:0, y:-1, idx:UP, key:null },
    { x:1, y:0, idx:RIGHT, key:null },
    { x:0, y:1, idx:DOWN, key:null },
    { x:-1, y:0, idx:LEFT, key:null }
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

        this.initExit(difficulty, mazeData.end);
        this.initPlayer(difficulty, mazeData.start);
        this.initEnemy(difficulty, mazeData.enemy);
    }

    init() {
        this.grid = new Grid();
        let yOffset = Math.floor((App.DIM_Y - 3) / 3)
        yOffset = (yOffset & 1)? yOffset : yOffset - 1;
        BOUNDARY_POINTS.push(
            {x:0, y:yOffset},
            {x:App.DIM_X - 1, y:yOffset},
            {x:0, y:App.DIM_Y - 1 - yOffset},
            {x:App.DIM_X - 1, y:App.DIM_Y - 1 - yOffset}
        );
    }

    #refresh() {
        this.enemy.update(App.canvas.deltaTime);
        this.player.update(App.canvas.deltaTime);

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
        this.grid.setNodeType(pos, Node.Types.PATH);
        this.grid.addEntity(this.player);
    }
    
    initExit(difficulty, pos) {
        this.exit = new Entity(pos, Entity.Types.EXIT);
        this.entities.add(this.exit)
        this.grid.setNodeType(pos, Node.Types.PATH);
        this.grid.addEntity(this.exit);
    }
    
    initEnemy(difficulty, pos) {
        if (this.level > 0) {
            this.enemy = new Enemy(this, pos);
            this.entities.add(this.enemy);
            this.grid.addEntity(this.enemy);
        } else {
             this.enemy = new Entity(pos, Entity.Types.NONE);
        }
    }

    nextLevel() {
        this.level++;
        this.reset();
        if (this.level == Game.Difficulty.length) {
            Game.app.setPage(Game.app.Pages.MAIN_MENU);
        }
    }

    static app = null;
}

