import Entity from "./Entity.js"

export default class Exit extends Entity {
    constructor(game, type) {
        super(type);
        Exit.game = game;
    }

    update(deltaTime) {
        this.drawSpotlight(Exit.game.grid, 2, 0.1);
    }

    static game;
}