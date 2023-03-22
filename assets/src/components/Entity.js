export default class Entity {
    constructor(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

    move(dir) {
        this.x += dir.x;
        this.y += dir.y;
    }
}