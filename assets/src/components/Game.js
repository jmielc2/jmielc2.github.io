import Node from "./Node.js"
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
    { x:0, y:1, key:null },
    { x:1, y:0, key:null },
    { x:0, y:-1, key:null },
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
        this.iter = 0;
        this.entities = new Set();
    }

    reset(p) {
        this.entities.clear();
        this.grid.forEach((row) => {
            row.forEach((node) => {
                node.reset();
            })
        })
        let difficulty = Game.Difficulty[(this.iter < Game.Difficulty.length)? this.iter : Game.Difficulty.length - 1]
        
        let mazeData = null;
        let i = 0;
        do {
            mazeData = generateMaze(this, difficulty);
            i++;
        } while (getDistance(mazeData.start, mazeData.enemy) < 6 && i < 3);
        this.initPlayer(difficulty, mazeData.start);
        this.initExit(difficulty, mazeData.end);
        this.initEnemy(difficulty, mazeData.enemy);
    }

    init(p) {
        this.grid = Array(Game.app.DIM_Y).fill(0).map((x) => Array(Game.app.DIM_X).fill(0));
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                this.grid[i][j] = new Node(j, i);
            }
        }
        let yOffset = Math.round((Game.app.DIM_Y - 3) / 3)
        yOffset = (yOffset & 1)? yOffset : yOffset - 1;
        BOUNDARY_POINTS.push(
            {x:0, y:yOffset},
            {x:Game.app.DIM_X - 1, y:yOffset},
            {x:0, y:Game.app.DIM_Y - 1 - yOffset},
            {x:Game.app.DIM_X - 1, y:Game.app.DIM_Y - 1 - yOffset}
        );
    }

    #refresh(p) {
        // Update Enemy
        // Update Player
        this.player.update(this.player, p.deltaTime);
        // Recalculate Node Light Vals

        p.clear();
        this.#drawGrid(p);
    }

    #drawGrid(p) {
        p.rectMode(p.CORNER);
        this.grid.forEach((row) => {
            row.forEach((node) => {
                node.draw(p);
            });
        });
    }

    startup(p) {
        this.reset();
        this.update = this.#refresh;
    }

    pause(p) {
        this.update = this.startup;
    }

    initPlayer(difficulty, pos) {
        this.player = new Player(this, pos);
        this.entities.add(this.player);
        this.grid[pos.y][pos.x].setType(Node.Type.PLAYER);
    }
    
    initExit(difficulty, pos) {
        this.entities.add(new Entity(pos))
        this.grid[pos.y][pos.x].setType(Node.Type.EXIT);
    }
    
    initEnemy(difficulty, pos) {
        this.enemy = new Enemy(this, pos);
        this.entities.add(this.enemy);
        this.grid[pos.y][pos.x].setType(Node.Type.ENEMY);
    }

    static app = null;
}

