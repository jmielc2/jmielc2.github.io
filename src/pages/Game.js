import Node from "../components/Node.js"
import Grid from "../components/Grid.js"
import { generateMaze } from "../components/utils/MazeUtils.js"
import Entity from "../components/Entity.js"
import Exit from "../components/Exit.js"
import Player from "../components/Player.js"
import Enemy from "../components/Enemy.js"
import Rope from "../components/Rope.js"
import Thread from "../components/Thread.js"
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
        this.update = this.#startup;
        this.level = 0;
        this.entities = new Set();
        Thread.setGame(this);
    }

    reset() {
        this.entities.clear();
        this.grid.reset();
        let difficulty = Game.Difficulty[(this.level < Game.Difficulty.length)? this.level : Game.Difficulty.length - 1]
        const mazeData = generateMaze(this.grid.grid, difficulty, (this.level <= 1)? 1 : 2);
        this.startExit(mazeData.end);
        this.startPlayer(mazeData.start);
        this.startRope(mazeData.dead_ends[0]);
        this.startEnemy(mazeData.dead_ends);
    }

    init() {
        this.grid = new Grid();
        let yOffset = Math.floor((App.DIM_Y - 3) / 3)
        yOffset = (yOffset & 1)? yOffset : yOffset - 1;
        BOUNDARY_POINTS.push(
            {x:0, y:yOffset},
            {x:App.DIM_X - 1, y:yOffset},
            {x:App.DIM_X - 1, y:App.DIM_Y - 1 - yOffset},
            {x:0, y:App.DIM_Y - 1 - yOffset},
        );
        this.player = new Player(this);
        this.exit = new Exit(this, Entity.Types.EXIT);
    }

    #refresh() {
        this.grid.grid.forEach((row) => {
            row.forEach((node) => {
                node.setIntensity();
            });
        });
        this.entities.forEach((entity) => {
            entity.update(App.canvas.deltaTime);
        });

        App.canvas.clear();
        this.grid.draw();
        this.entities.forEach((entity) => {
            entity.draw();
        });
    }

    #startup() {
        this.level = 0;
        this.player.reset();
        this.update = this.#beginLevel;
    }

    #beginLevel() {
        this.reset();
        
        this.update = this.#refresh;
    }

    pause() {
        this.update = this.#startup;
    }
    
    addEntity(entity) {
        return (this.entities.add(entity) && this.grid.addEntity(entity));
    }

    removeEntity(entity) {
        return (this.entities.delete(entity) && this.grid.removeEntity(entity));
    }

    startPlayer(pos) {
        this.player.start(pos);
        this.grid.setNodeType(pos, Node.Types.PATH);
        this.addEntity(this.player);
    }
    
    startExit(pos) {
        this.exit.setPos(pos);
        this.grid.setNodeType(pos, Node.Types.PATH);
        this.addEntity(this.exit);
    }

    startRope(pos) {
        if (this.level == 0) {
            this.rope = new Rope(this, pos);
            this.addEntity(this.rope);
        } else {
            this.rope = null;
        }
    }
    
    startEnemy(pos) {
        pos.forEach((node) => {
            if (this.level >= 1) {
                let enemy = new Enemy(this);
                enemy.start(node);
                this.addEntity(enemy);
            }
        });
    }

    nextLevel() {
        this.level++;
        if (this.level == Game.Difficulty.length) {
            if (this.player.hasThread) {
                Game.app.Pages.END_PAGE.setSubText("...but can you do it without the thread?");
            } else {
                Game.app.Pages.END_PAGE.setSubText("And you did it without the thread! Very Nice!");
            }
            Game.app.setPage(Game.app.Pages.END_PAGE);
            return;
        } else {
            this.update = this.#beginLevel;
        }
    }

    static app = null;
}

