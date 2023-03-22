import Entity from "./Entity.js"

export default class Enemy extends Entity {
    constructor(game, pos) {
        super(pos);
        Enemy.game = game;
    }

    static game;
}